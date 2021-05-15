import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsCategoryRoutingModule } from './albums-category-routing.module';
import { AlbumsCategoryAddComponent } from './albums-category-add/albums-category-add.component';

import { AlbumsCategoryListComponent } from './albums-category-list/albums-category-list.component';


@NgModule({
  declarations: [
    AlbumsCategoryAddComponent,
    AlbumsCategoryListComponent
  ],
  imports: [
    CommonModule,
    AlbumsCategoryRoutingModule
  ]
})
export class AlbumsCategoryModule { }
