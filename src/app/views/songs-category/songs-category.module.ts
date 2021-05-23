import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsCategoryRoutingModule } from './songs-category-routing.module';
import { SongsCategoryEditComponent } from './songs-category-edit/songs-category-edit.component';
import { SongsCategoryListComponent } from './songs-category-list/songs-category-list.component';
import { SongsCategoryDetailsComponent } from './songs-category-details/songs-category-details.component';
import { SongsCategoryAddComponent } from './songs-category-add/songs-category-add.component';


import { NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    SongsCategoryEditComponent,
    SongsCategoryListComponent,
    SongsCategoryDetailsComponent,
    SongsCategoryAddComponent
  ],
  imports: [
    CommonModule,
    SongsCategoryRoutingModule,
    NgbCarouselModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class SongsCategoryModule { }

