import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelsComponent } from './levels.component';
import { SharedModule } from '../shared/shared.module';
import { LevelsRoutingModule } from './levels-routing.module';


@NgModule({
  declarations: [
    LevelsComponent
  ],
  imports: [
    CommonModule,
    LevelsRoutingModule,
    SharedModule
  ]
})
export class LevelsModule { }
