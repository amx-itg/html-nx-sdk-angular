import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesComponent } from './files.component';
import { SharedModule } from '../shared/shared.module';
import { FilesRoutingModule } from './files-routing.module';


@NgModule({
  declarations: [
    FilesComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    SharedModule
  ]
})
export class FilesModule { }
