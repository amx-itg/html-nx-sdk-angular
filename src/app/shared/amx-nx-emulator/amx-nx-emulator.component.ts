import { Component } from '@angular/core';
@Component({
  selector: 'amx-nx-emulator',
  templateUrl: './amx-nx-emulator.component.html',
  styleUrls: ['./amx-nx-emulator.component.scss']
})
export class AmxNxEmulatorComponent {

  props = "emulator"

  btnProp: any = {
    port: 10,
    channel: 1000,
    icon: 'bi bi-bar-chart-fill',
    text: 'Button Text',
  }

  cbProps = {
    port: 1,
    channel: 100,
    text: 'This is the Label',
    labelVisible: true,
    switch: false,
  }

  lvlProps = {
    port: 1,
    level: 1,
    setValue: 255,
  }

  handleBtnPropChange(value: any, key: any): void {
    this.btnProp = { ...this.btnProp, [key]: value };
  }

  handleCBPropChange(value: any, key: any): void {
    this.cbProps = { ...this.cbProps, [key]: value };
  }

  handleLevelChange(value: any, key: any): void {
    this.lvlProps = { ...this.lvlProps, [key]: value };
  }
}
