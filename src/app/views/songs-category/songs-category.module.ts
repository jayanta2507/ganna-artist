import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsCategoryRoutingModule } from './songs-category-routing.module';
import { SongsCategoryListComponent } from './songs-category-list/songs-category-list.component';
import { SongsCategoryAddComponent } from './songs-category-add/songs-category-add.component';
import { SongsCategoryDetailsComponent } from './songs-category-details/songs-category-details.component';
import { SongsCategoryEditComponent } from './songs-category-edit/songs-category-edit.component';


@NgModule({
  declarations: [
    SongsCategoryListComponent,
    SongsCategoryAddComponent,
    SongsCategoryDetailsComponent,
    SongsCategoryEditComponent
  ],
  imports: [
    CommonModule,
    SongsCategoryRoutingModule
  ]
})
export class SongsCategoryModule { }
