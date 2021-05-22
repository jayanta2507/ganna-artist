import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsCategoryRoutingModule } from './songs-category-routing.module';
import { SongsCategoryEditComponent } from './songs-category-edit/songs-category-edit.component';
import { SongsCategoryListComponent } from './songs-category-list/songs-category-list.component';
import { SongsCategoryDetailsComponent } from './songs-category-details/songs-category-details.component';
import { SongsCategoryAddComponent } from './songs-category-add/songs-category-add.component';


@NgModule({
  declarations: [
    SongsCategoryEditComponent,
    SongsCategoryListComponent,
    SongsCategoryDetailsComponent,
    SongsCategoryAddComponent
  ],
  imports: [
    CommonModule,
    SongsCategoryRoutingModule
  ]
})
export class SongsCategoryModule { }

