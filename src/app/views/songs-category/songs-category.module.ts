import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsCategoryRoutingModule } from './songs-category-routing.module';
import { SongsCategoryListComponent } from './songs-category-list/songs-category-list.component';


@NgModule({
  declarations: [SongsCategoryListComponent],
  imports: [
    CommonModule,
    SongsCategoryRoutingModule
  ]
})
export class SongsCategoryModule { }
