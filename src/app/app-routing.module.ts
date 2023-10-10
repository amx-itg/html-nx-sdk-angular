import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'channels', pathMatch: 'full' },
  { path: 'channels', loadChildren: () => import('./channels/channels.module').then(m => m.ChannelsModule) },
  { path: 'levels', loadChildren: () => import('./levels/levels.module').then(m => m.LevelsModule) },
  { path: 'emulator', loadChildren: () => import('./emulator/emulator.module').then(m => m.EmulatorModule) },
  { path: 'files', loadChildren: () => import('./files/files.module').then(m => m.FilesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
