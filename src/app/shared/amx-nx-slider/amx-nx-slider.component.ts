import { ChangeDetectionStrategy, Component, Input, ElementRef, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AmxNxHcontrolService } from 'src/app/services/amx-nx-hcontrol.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import { parseInterger } from 'src/app/utils/math';
import { IonRangeSliderComponent } from '../ion-range-slider/ion-range-slider.component';

@Component({
  selector: 'amx-nx-slider',
  templateUrl: './amx-nx-slider.component.html',
  styleUrls: ['./amx-nx-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmxNxSliderComponent implements OnInit, OnDestroy {
  @ViewChild('bgRef') bgRef!: ElementRef;
  @ViewChild('ionSliderRef') ionSliderRef!: IonRangeSliderComponent;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  @Input() set configuration(value: any) {
    this.options = {
      ...(value || {}),
      port: value.port || 1,
      level: value.level || 1,
      level_1: value.level_1 || 1,
      level_2: value.level_2 || 2,
      oc: value.onchange ?? false,
      of: value.onfinish ?? true,
      sliding: value.sliding ?? false,
      id:
        value.id ||
        `slider_${Math.floor(Math.random() * Math.random() * 10000)}`,
      type: value.type || 'single',
      skin: value.skin || 'flat',
      color: value.color || 'bg-primary',
      min: value.min || 0,
      max: value.max || 255,
      from: value.from || 128,
      step: value.step || 1,
      grid: value.grid ?? true,
      grid_num: value.grid_num ?? 4,
      grid_snap: value.grid_snap ?? true,
      force_edges: value.force_edges ?? true,
      hide_min_max: value.hide_min_max ?? false,
      hide_from_to: value.hide_from_to ?? false,
      prefix: value.prefix || '',
      postfix: value.postfix || '',
      decorate_both: value.decorate_both ?? true,
      values_separator: value.values_separator || '-',
      prettify: value.prettify ?? true,
      separator: value.separator || ',',
    };

  }
  options: any;

  private eventSubscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private amxControlService: AmxNxHcontrolService,
    private eventBusService: EventBusService,
    private cdr: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
      this.setColor();
    }  

  ngOnInit(): void {
    this.options.oldVal = {
      from: this.options.min,
      to: this.options.max,
    };

    this.subscribeEvents();
    this.cdr.detectChanges();

  }


  private subscribeEvents = () => {
    this.eventSubscription = this.eventBusService.on('level.event').subscribe(this.onLevelEventChange.bind(this));
  }

  private onLevelEventChange(data: any): void {
    const params = this.options;

    if (!this.ionSliderRef || !params) return;

    const { port, type, level_1, level_2, level, sliding } = params;
    const slider = this.ionSliderRef;

    if (parseInterger(data.port) === parseInterger(port)) {
      if (type === 'single') {
        if (parseInterger(data.level) === parseInterger(level)) {
          if (!sliding) {
            slider.update({ from: parseInterger(data.value) });
            this.cdr.detectChanges();
          }
        }
      } else if (type === 'double') {
        if (parseInterger(data.level) === parseInterger(level_1)) {
          if (!sliding) {
            slider.update({ from: parseInterger(data.value) });
            this.cdr.detectChanges();
          }
        } else if (parseInterger(data.level) === parseInterger(level_2)) {
          if (!sliding) {
            slider.update({ to: parseInterger(data.value) });
            this.cdr.detectChanges();
          }
        }
      }
    }

  }


  setColor(): void {
    if (!this.bgRef || !this.sliderContainer) return;

    const bgc = getComputedStyle(this.bgRef.nativeElement).backgroundColor;
    const container = this.sliderContainer.nativeElement;
    const params = this.options;

    if (params.type === 'single') {
      container.querySelector('.irs-bar--single').style.backgroundColor = bgc;
      container.querySelector('.irs-single').style.backgroundColor = bgc;
      container.querySelector(
        '.irs-handle > i:first-child',
      ).style.backgroundColor = bgc;
    } else if (params.type === 'double') {

      container.querySelector('.irs-bar').style.backgroundColor = bgc;
      container.querySelector('.irs-from').style.backgroundColor = bgc;
      container.querySelector('.irs-to').style.backgroundColor = bgc;
      container.querySelector('.irs-single').style.backgroundColor = bgc;
      container.querySelectorAll(
        '.irs-handle > i:first-child',
      ).forEach((node:any) => {
        if(node) node.style.backgroundColor = bgc;
      })
    }
    this.cdr.detectChanges();

  }

  onUpdate(): void {
    this.setColor();
  }

  onStart(): void {
    const { port, type, level_1, level_2, level } = this.options;
    this.setColor();
    if (type === 'single') {
      this.amxControlService.getLevel(port, level);
    } else if (type === 'double') {
      this.amxControlService.getLevel(port, level_1);
      this.amxControlService.getLevel(port, level_2);
    }
  }

  hctrlevent(data: any): void {
    const { port, type, level_1, level_2, level, oldVal } = this.options;
    if (type === 'single') {
      this.amxControlService.setLevel(port, level, data.from);
    } else if (type === 'double') {
      if (data.from !== oldVal.from) {
        this.amxControlService.setLevel(port, level_1, data.from);
        oldVal.from = data.from;
      }
      if (data.to !== oldVal.to) {
        this.amxControlService.setLevel(port, level_2, data.to);
        oldVal.to = data.to;
      }
    }
    this.cdr.detectChanges();

  };

  onChange(data: any): void {

    const { oc } = this.options;
    this.options.sliding = true;
    if (oc) {
      this.hctrlevent(data);
    }
  }

  onFinish(data: any): void {

    const { of } = this.options;
    this.options.sliding = false;
    if (of) {
      this.hctrlevent(data);
    }
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
    this.eventBusService.remove("level.event")
  }
}
