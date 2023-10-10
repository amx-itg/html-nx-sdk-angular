import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'amx-nx-cbgroup',
  templateUrl: './amx-nx-cbgroup.component.html',
  styleUrls: ['./amx-nx-cbgroup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AmxNxCBGroupComponent {
  @Input() configuration: any;
  cbGroupConfig: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['configuration']) {
      let cbg = this.configuration ? this.configuration : {};
      if (cbg.port === undefined) { cbg.port = 1 }
      if (cbg.checkboxes === undefined) { cbg.checkboxes = [] }
      if (cbg.labelVisible === undefined) { cbg.labelVisible = false }
      if (cbg.switch === undefined) { cbg.switch = false }
      if (cbg.inline === undefined) { cbg.inline = false }
      if (cbg.checkboxes) {
        const updatedcheckboxes = cbg.checkboxes.map((checkbox: any) => ({
          ...checkbox,
          port: cbg.port,
          switch: cbg.switch,
          inline: cbg.inline
        }));

        cbg.checkboxes = updatedcheckboxes
      }
      this.cbGroupConfig = Object.assign({}, cbg);

    }
  }
}
