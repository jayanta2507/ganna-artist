import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsCategoryRoutingModule } from './albums-category-routing.module';
import { AlbumsCategoryAddComponent } from './albums-category-add/albums-category-add.component';
import { AlbumsCategoryListComponent } from './albums-category-list/albums-category-list.component';
import { AlbumsCategoryEditComponent } from './albums-category-edit/albums-category-edit.component';
import { AlbumsCategoryDetailsComponent } from './albums-category-details/albums-category-details.component';

import { NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AlbumsCategoryAddComponent,
    AlbumsCategoryListComponent,
    AlbumsCategoryEditComponent,
    AlbumsCategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    AlbumsCategoryRoutingModule,
    NgbCarouselModule,
    NgbCarouselModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class AlbumsCategoryModule { }
