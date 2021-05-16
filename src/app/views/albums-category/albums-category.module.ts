import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsCategoryRoutingModule } from './albums-category-routing.module';
import { AlbumsCategoryAddComponent } from './albums-category-add/albums-category-add.component';

import { AlbumsCategoryListComponent } from './albums-category-list/albums-category-list.component';
import { AlbumsCategoryEditComponent } from './albums-category-edit/albums-category-edit.component';
import { AlbumsCategoryDetailsComponent } from './albums-category-details/albums-category-details.component';


@NgModule({
  declarations: [
    AlbumsCategoryAddComponent,
    AlbumsCategoryListComponent,
    AlbumsCategoryEditComponent,
    AlbumsCategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    AlbumsCategoryRoutingModule
  ]
})
export class AlbumsCategoryModule { }
