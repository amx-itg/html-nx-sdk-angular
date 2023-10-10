import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'amx-nx-button-grid',
  templateUrl: './amx-nx-button-grid.component.html',
  styleUrls: ['./amx-nx-button-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmxNxButtonGridComponent {
  @Input() configuration: any;
  gridConfig: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['configuration']) {
      let grid = this.configuration ? this.configuration : {};
      if (grid.port === undefined) { grid.port = 1 }
      if (grid.btns === undefined) { grid.btns = [] }

      grid.size = (grid.gridSize !== undefined) ? Math.ceil(12 / grid.gridSize) : 4;
      grid.marginX = (grid.gridMarginX !== undefined) ? grid.gridMarginX : 1;
      grid.marginY = (grid.gridMarginY !== undefined) ? grid.gridMarginY : 1;
      grid.justify = (grid.gridJustify !== undefined) ? grid.gridJustify : 'center';

      if (grid.btns) {
        const updatedBtns = grid.btns.map((btn: any) => ({
          ...btn,
          port: grid.port ?? 1,
        }));
        grid.btns = updatedBtns;
      }
      this.gridConfig = Object.assign({}, grid);

    }
  }

}
