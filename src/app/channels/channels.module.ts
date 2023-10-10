import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelsComponent } from './channels.component';
import { SharedModule } from '../shared/shared.module';
import { ChannelsRoutingModule } from './channels-routing.module';


@NgModule({
  declarations: [
    ChannelsComponent
  ],
  imports: [
    CommonModule,
    ChannelsRoutingModule,
    SharedModule
  ]
})
export class ChannelsModule { }
