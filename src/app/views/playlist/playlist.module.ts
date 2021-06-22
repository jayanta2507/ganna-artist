import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistAddComponent } from './playlist-add/playlist-add.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { PlaylistEditComponent } from './playlist-edit/playlist-edit.component';


@NgModule({
  declarations: [
    PlaylistListComponent,
    PlaylistAddComponent,
    PlaylistDetailsComponent,
    PlaylistEditComponent
  ],
  imports: [
    CommonModule,
    PlaylistRoutingModule
  ]
})
export class PlaylistModule { }
