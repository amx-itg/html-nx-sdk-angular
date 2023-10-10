import { ElementRef, OnChanges, SimpleChanges, Input, EventEmitter, Output, Component } from "@angular/core";

declare let jQuery: any;

@Component({
  selector: 'amx-ion-range-slider',
  template: `<input type="text" value="" />`
})
export class IonRangeSliderComponent implements OnChanges {

  @Input() options!: any;
  @Output() onStart: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();
  @Output() onChange: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();
  @Output() onFinish: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();
  @Output() onUpdate: EventEmitter<IonRangeSliderCallback> = new EventEmitter<IonRangeSliderCallback>();

  private el: ElementRef;
  private inputElem: any;
  private initialized = false;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {
    this.inputElem = this.el.nativeElement.getElementsByTagName('input')[0];
    this.initSlider();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      for (let propName in changes) {
        let update: any = {};
        update[propName] = changes[propName].currentValue;
        jQuery(this.inputElem).data("ionRangeSlider").update(update);
      }
    }
  }

  update(data: any) {
    jQuery(this.inputElem).data("ionRangeSlider").update(data);
  }

  reset() {
    jQuery(this.inputElem).data("ionRangeSlider").reset()
  }

  destroy() {
    jQuery(this.inputElem).data("ionRangeSlider").destroy()
  }

  private initSlider() {
    let that = this;
    (<any>jQuery(this.inputElem)).ionRangeSlider({
      ...this.options,
      onStart: function () {
        that.onStart.emit(that.buildCallback());
      },
      onChange: function (a: any) {
        that.updateInternalValues(a);
        that.onChange.emit(that.buildCallback());
      },
      onFinish: function () {
        that.onFinish.emit(that.buildCallback());
      },
      onUpdate: function () {
        that.onUpdate.emit(that.buildCallback());
      }
    });
    this.initialized = true;
  }

  private updateInternalValues(data: IonRangeSliderCallback) {
    this.options = Object.assign({}, this.options, {
      min: data.min,
      max: data.max,
      from: data.from,
      from_percent: data.from_percent,
      from_value: data.from_value,
      to: data.to,
      to_percent: data.to_percent,
      to_value: data.to_value
    })
  }

  private buildCallback(): IonRangeSliderCallback {
    let callback = new IonRangeSliderCallback();
    callback.min = this.options.min;
    callback.max = this.options.max;
    callback.from = this.options.from;
    callback.from_percent = this.options.from_percent;
    callback.from_value = this.options.from_value;
    callback.to = this.options.to;
    callback.to_percent = this.options.to_percent;
    callback.to_value = this.options.to_value;
    return callback;
  }
}

export class IonRangeSliderCallback {
  min: any;               // MIN value
  max: any;               // MAX value
  from!: number;           // FROM value (left or single handle)
  from_percent!: number;   // FROM value in percents
  from_value!: number;     // FROM index in values array (if used)
  to!: number;             // TO value (right handle in double type)
  to_percent!: number;     // TO value in percents
  to_value!: number;       // TO index in values array (if used)
}
