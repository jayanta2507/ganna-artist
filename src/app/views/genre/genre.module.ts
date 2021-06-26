import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreAddComponent } from './genre-add/genre-add.component';

import { NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    GenreListComponent,
    GenreAddComponent
    
  ],
  imports: [
    CommonModule,
    GenreRoutingModule,
    NgbCarouselModule,
    NgbCarouselModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule
  ]
})
export class GenreModule { }
