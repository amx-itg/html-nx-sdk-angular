import { Component } from '@angular/core';

@Component({
  selector: 'amx-emulator',
  templateUrl: './emulator.component.html',
  styleUrls: ['./emulator.component.scss']
})
export class EmulatorComponent {

  messages: any[] = [];

  clearLog() {
    this.messages = JSON.parse(JSON.stringify([]));
  }

}
