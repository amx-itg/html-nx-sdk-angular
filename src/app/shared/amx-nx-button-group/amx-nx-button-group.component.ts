import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'amx-nx-button-group',
  templateUrl: './amx-nx-button-group.component.html',
  styleUrls: ['./amx-nx-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AmxNxButtonGroupComponent {
  @Input() configuration: any;
  groupConfig: any
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['configuration']) {
      if (this.configuration) {
        let group = (this.configuration !== undefined) ? this.configuration : {};
        if (group.port === undefined) { group.port = 1 }
        if (group.btns === undefined) { group.btns = [] }

        group._dir = (group.direction !== undefined) ? group.direction : "button-group";

        if (group.btns) {
          const updatedBtns = group.btns.map((btn: any) => ({
            ...btn,
            port: group.port,
          }));
          group.btns = updatedBtns;
        }
        this.groupConfig = Object.assign({}, group);

      }
    }
  }
}
