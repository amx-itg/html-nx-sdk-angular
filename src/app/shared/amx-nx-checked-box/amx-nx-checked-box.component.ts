import { ChangeDetectionStrategy, ChangeDetectorRef, Component,OnChanges, Input, OnDestroy,  SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AmxNxHcontrolService } from 'src/app/services/amx-nx-hcontrol.service';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'amx-nx-checked-box',
  templateUrl: './amx-nx-checked-box.component.html',
  styleUrls: ['./amx-nx-checked-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AmxNxCheckedBoxComponent implements OnChanges, OnDestroy {
  @Input() configuration: any;
  checkboxConfig: any = {};

  private channelEventSubscription: Subscription = new Subscription;
  isInitialized: boolean = false;

  constructor(private amxNxHcontrolService: AmxNxHcontrolService, private eventBusService: EventBusService, private cdr: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['configuration']) {
      let cb = this.configuration ? this.configuration : {};
      if (cb.port === undefined) {
        cb.port = 1;
      }
      if (cb.channel === undefined) {
        cb.channel = 1;
      }
      (cb.labelVisible === undefined || !cb.labelVisible) ? cb.labelVisible = true : cb.labelVisible = false;
      if (cb.text === undefined) { cb.text = `Checkbox for Port ${cb.port} and Channel ${cb.channel}`; }
      cb.initText =
        cb.text !== undefined
          ? cb.text
          : 'Checkbox';
      cb.switch === undefined || cb.switch ? (cb.switch = true) : false;
      cb.inline === undefined || !cb.inline
        ? (cb.inline = false)
        : (cb.inline = true);
      cb.checked = cb.checked === undefined ? false : cb.checked;
      
      if (
        this.checkboxConfig &&
        (this.checkboxConfig.port !== this.configuration.port ||
          this.checkboxConfig.channel !== this.configuration.channel)
      ) {
        this.getButton(cb);
      }
      this.checkboxConfig = Object.assign({}, cb);
      if (!this.isInitialized) {        
        this.getButton(this.checkboxConfig);
        this.bindEvent();
        this.isInitialized = true;
      }
    }
  }

  getButton(config: any): void {
    this.amxNxHcontrolService.getButton(config.port, config.channel);
    this.amxNxHcontrolService.getButton(config.port, config.channel, 'text');
    this.amxNxHcontrolService.getButton(config.port, config.channel, 'show');
    this.amxNxHcontrolService.getButton(config.port, config.channel, 'enable');
  }
  onChange(value: any) {
    this.amxNxHcontrolService.setButton(this.checkboxConfig.port, this.checkboxConfig.channel, 'push');
    this.amxNxHcontrolService.setButton(this.checkboxConfig.port, this.checkboxConfig.channel, 'release');
  }

  bindEvent(): void {
    this.channelEventSubscription = this.eventBusService.on('channel.event').subscribe((data) => {
      const cb = Object.assign({}, this.checkboxConfig);

      if (parseInt(data.port) === parseInt(cb.port) && parseInt(cb.channel) === parseInt(data.channel)) {
        switch (data.event) {
          case 'state':
            cb.checked = data.state
            break;
          case 'text':
            if (data.newText !== undefined && data.newText !== '') {
              cb.text = data.newText;
            } else if (cb.initText !== cb.text || data.newText === '') {
              cb.text = cb.initText;
            }
            break;
          case 'enable':
            if (data.state) {
              cb.disabled = false;
            } else {
              cb.disabled = true;
            }
            break;
          case 'show':
            if (data.state) {
              cb.hidden = false;
            } else {
              cb.hidden = true;
            }
            break;
        }
        this.checkboxConfig = cb;
        this.cdr.detectChanges();
      }

    })
  }

  ngOnDestroy(): void {
    if (this.channelEventSubscription) {
      this.eventBusService.remove("channel.event");
      this.channelEventSubscription.unsubscribe();
    }
  }
}
