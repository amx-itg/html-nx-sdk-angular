import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AmxNxHcontrolService } from 'src/app/services/amx-nx-hcontrol.service';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'amx-nx-radio',
  templateUrl: './amx-nx-radio.component.html',
  styleUrls: ['./amx-nx-radio.component.scss']
})
export class AmxNxRadioComponent implements OnChanges, OnDestroy {
  @Input() configuration: any;

  radioConfig: any
  isInitialized: boolean = false;
  private channelEventSubscription: Subscription = new Subscription;

  constructor(private amxNxHcontrolService: AmxNxHcontrolService, private eventBusService: EventBusService, private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['configuration']) {
      let radio = this.configuration ? this.configuration : {};
      if (radio.port === undefined) { radio.port = 1 }
      if (radio.channel === undefined) { radio.channel = 1 }
      radio.initText =
        radio.text !== undefined
          ? radio.text
          : 'Radio';
      (radio.labelVisible === undefined || !radio.labelVisible) ? radio.labelVisible = true : radio.labelVisible = false;
      (radio.inline === undefined || !radio.inline) ? radio.inline = false : radio.inline = true;
      radio.checked = radio.checked === undefined ? false : radio.checked;
      this.radioConfig = Object.assign({}, radio);
      if (!this.isInitialized) {
        this.getButton(this.radioConfig);
        this.bindEvent();
        this.isInitialized = true;
      }
    }
  }

  getButton(config: any): void {
    this.amxNxHcontrolService.getButton(config.port, config.channel, 'show');
    this.amxNxHcontrolService.getButton(config.port, config.channel, 'enable');
    this.amxNxHcontrolService.getButton(config.port, config.channel, 'text');
    this.amxNxHcontrolService.getButton(config.port, config.channel);
  }

  bindEvent(): void {
    this.channelEventSubscription = this.eventBusService.on('channel.event').subscribe((data) => {
      const radio = this.radioConfig;
      if (parseInt(data.port) === parseInt(radio.port) && parseInt(radio.channel) === parseInt(data.channel)) {
        switch (data.event) {
          case 'state':
            radio.checked = !!data.state;
            break;
          case 'text':
            if (data.newText !== undefined && data.newText !== '') {
              radio.text = data.newText;
            } else if (radio.initText !== radio.text || data.newText === '') {
              radio.text = radio.initText;
            }
            break;
          case 'enable':
            if (data.state) {
              radio.disabled = false;
            } else {
              radio.disabled = true;
            }
            break;
          case 'show':
            if (data.state) {
              radio.hidden = false;
            } else {
              radio.hidden = true;
            }
            break;
        }
        this.radioConfig = Object.assign({}, radio);
        this.cdr.detectChanges();
      }

    });
  }

  onChange() {
    this.amxNxHcontrolService.setButton(this.radioConfig.port, this.radioConfig.channel, 'push');
    this.amxNxHcontrolService.setButton(this.radioConfig.port, this.radioConfig.channel, 'release');
  }

  ngOnDestroy(): void {
    if (this.channelEventSubscription) {
      this.eventBusService.remove("channel.event");
      this.channelEventSubscription.unsubscribe();
    }
  }
}
