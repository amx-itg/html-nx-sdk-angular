import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SimplemdeModule } from 'ngx-simplemde';

import { AmxNxButtonComponent } from './amx-nx-button/amx-nx-button.component';
import { AmxNxButtonGridComponent } from './amx-nx-button-grid/amx-nx-button-grid.component';
import { AmxNxButtonGroupComponent } from './amx-nx-button-group/amx-nx-button-group.component';
import { AmxNxCheckedBoxComponent } from './amx-nx-checked-box/amx-nx-checked-box.component';
import { AmxNxCBGroupComponent } from './amx-nx-cbgroup/amx-nx-cbgroup.component';
import { AmxNxRadioGroupComponent } from './amx-nx-radio-group/amx-nx-radio-group.component';
import { AmxNxMeterComponent } from './amx-nx-meter/amx-nx-meter.component';
import { AmxNxConnectionLogDrawerComponent } from './amx-nx-connection-log-drawer/amx-nx-connection-log-drawer.component';
import { AmxNxSliderComponent } from './amx-nx-slider/amx-nx-slider.component';
import { AmxNxConnectionConfigComponent } from './amx-nx-connection-config/amx-nx-connection-config.component';
import { AmxNxEmulatorComponent } from './amx-nx-emulator/amx-nx-emulator.component';
import { AmxNxLogComponent } from './amx-nx-log/amx-nx-log.component';
import { NgbActiveOffcanvas, NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AmxNxScrollBarComponent } from './amx-nx-scroll-bar/amx-nx-scroll-bar.component';
import { AmxTextEditorComponent } from './amx-text-editor/amx-text-editor.component';
import { PreloadingComponent } from './preloading/preloading.component';
import { AmxNxRadioComponent } from './amx-nx-radio/amx-nx-radio.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { IonRangeSliderComponent } from './ion-range-slider/ion-range-slider.component';
import { AmxNxLevelComponent } from './amx-nx-level/amx-nx-level.component';

@NgModule({
  declarations: [
    AmxNxButtonComponent,
    AmxNxButtonGridComponent,
    AmxNxButtonGroupComponent,
    AmxNxCheckedBoxComponent,
    AmxNxCBGroupComponent,
    AmxNxRadioGroupComponent,
    AmxNxMeterComponent,
    AmxNxConnectionLogDrawerComponent,
    AmxNxSliderComponent,
    AmxNxConnectionConfigComponent,
    AmxNxEmulatorComponent,
    AmxNxLogComponent,
    AmxNxScrollBarComponent,
    AmxTextEditorComponent,
    PreloadingComponent,
    AmxNxRadioComponent,
    IonRangeSliderComponent,
    AmxNxLevelComponent
  ],
  exports: [AmxNxButtonComponent,
    AmxNxButtonComponent,
    AmxNxButtonGridComponent,
    AmxNxButtonGroupComponent,
    AmxNxCheckedBoxComponent,
    AmxNxCBGroupComponent,
    AmxNxRadioGroupComponent,
    AmxNxMeterComponent,
    AmxNxConnectionLogDrawerComponent,
    AmxNxSliderComponent,
    AmxNxConnectionConfigComponent,
    AmxNxEmulatorComponent,
    AmxNxLogComponent,
    AmxTextEditorComponent,
    PreloadingComponent,
    IonRangeSliderComponent
  ],
  providers: [NgbActiveOffcanvas],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    SimplebarAngularModule,
    SimplemdeModule.forRoot({
      // Global options
      options: {
        autosave: { enabled: true, uniqueId: 'MyUniqueID' },
      },
    }),
    NgbProgressbarModule
  ]
})
export class SharedModule { }
