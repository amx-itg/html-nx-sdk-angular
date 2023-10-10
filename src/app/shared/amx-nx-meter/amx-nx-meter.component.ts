import { ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, OnDestroy, Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AmxNxHcontrolService } from 'src/app/services/amx-nx-hcontrol.service';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'amx-nx-meter',
  templateUrl: './amx-nx-meter.component.html',
  styleUrls: ['./amx-nx-meter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AmxNxMeterComponent implements OnDestroy, OnChanges{
  @Input() configuration: any;
  meterConfig: any = null;

  isInitialized: boolean = false;
  private levelEventSubscription: Subscription = new Subscription;

  constructor(private amxNxHcontrolService: AmxNxHcontrolService, private cdr: ChangeDetectorRef, private eventBusService: EventBusService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['configuration']) {
    let mtr = this.configuration ? this.configuration : {};
    if (mtr.port == undefined) {
      mtr.port = 1;
    }
    if (mtr.level == undefined) {
      mtr.level = 1;
    }
    if (mtr.min == undefined) {
      mtr.min = 0;
    }
    if (mtr.max == undefined) {
      mtr.max = 255;
    }
    if (mtr.now === undefined) {
      mtr.now = 0;
    }
    if (mtr.style === undefined) {
      mtr.style = "bg-primary";
    }

    if (
      this.meterConfig &&
      (this.meterConfig.port !== this.configuration.port ||
        this.meterConfig.level !== this.configuration.level)
    ) {
      this.amxNxHcontrolService.getLevel(mtr.port, mtr.level);
    }
    this.meterConfig = Object.assign({}, mtr);
    if (!this.isInitialized) {
      this.amxNxHcontrolService.getLevel(this.meterConfig.port, this.meterConfig.level);
      this.bindEvent();
      this.isInitialized = true;
    }
  }
}

bindEvent(): void {

  this.levelEventSubscription = this.eventBusService.on('level.event').subscribe((data) => {

    const mtr: any = Object.assign({}, this.meterConfig);
    if (data.port == mtr.port && data.level == mtr.level) {
      let v = Math.round((data.value / mtr.max) * 100);
      mtr.now = v;
    }
    this.meterConfig = Object.assign({}, mtr);

    this.cdr.detectChanges();
  })
}

ngOnDestroy(): void {
  this.levelEventSubscription.unsubscribe();
  this.eventBusService.remove("level.event")

}

}
