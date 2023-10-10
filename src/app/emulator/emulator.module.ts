import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmulatorComponent } from './emulator.component';
import { SharedModule } from '../shared/shared.module';
import { EmulatorRoutingModule } from './emulator-routing.module';


@NgModule({
  declarations: [
    EmulatorComponent
  ],
  imports: [
    CommonModule,
    EmulatorRoutingModule,
    SharedModule
  ]
})
export class EmulatorModule { }
