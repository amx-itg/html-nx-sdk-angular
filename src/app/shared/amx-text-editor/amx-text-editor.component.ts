import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SimplemdeComponent, SimplemdeOptions } from 'ngx-simplemde';

@Component({
  selector: 'amx-text-editor',
  templateUrl: './amx-text-editor.component.html',
  styleUrls: ['./amx-text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmxTextEditorComponent {
  @Input() value: any;
  @Input() options: any;
  @Output() onChangeValue: EventEmitter<string> = new EventEmitter<string>();
  textValue: any;
  @ViewChild('simplemde', { static: true })
  private readonly simplemde!: SimplemdeComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      if (this.value) {
        this.textValue = this.value;
        this.cdr.detectChanges();
      }
    }
  }
  
  onChange(value: any) {
    this.onChangeValue.emit(value);
  }
}
