import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'amx-nx-radio-group',
  templateUrl: './amx-nx-radio-group.component.html',
  styleUrls: ['./amx-nx-radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AmxNxRadioGroupComponent {
  @Input() configuration: any;
  radioGroupConfig: any = null;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['configuration']) {
      let rg = this.configuration ? this.configuration : {};

      if (rg.port === undefined) { rg.port = 1 }
      if (rg.listName === undefined) { rg.listName = "radiolist_" + Math.floor(Math.random() * Math.random() * 10000) }
      if (rg.labelVisible === undefined) { rg.labelVisible = false }
      if (rg.inline === undefined) { rg.inline = true }
      if (rg.list === undefined) { rg.list = [] }

      if (rg.list) {
        const updatedradios = rg.list.map((radio: any) => ({
          ...radio,
          port: rg.port,
          inline: rg.inline
        }));
        rg.list = updatedradios;
      }

      this.radioGroupConfig = Object.assign({}, rg);

    }
  }
}
