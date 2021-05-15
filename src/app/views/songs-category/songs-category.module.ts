import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SongsCategoryRoutingModule } from './songs-category-routing.module';
import { SongListComponent } from './song-list/song-list.component';
import { SharedModule } from '../../shared/shared.module';
import { SongAddComponent } from './song-add/song-add.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import { SongDetailsComponent } from './song-details/song-details.component';

@NgModule({
  declarations: [
    SongListComponent,
    SongAddComponent,
    SongEditComponent,
    SongDetailsComponent
     
  ],
  imports: [
    CommonModule,
    SongsCategoryRoutingModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    InfiniteScrollModule
  ]
})
export class SongsCategoryModule { }
