import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastCategoryRoutingModule } from './podcast-category-routing.module';
import { PodcastCategoryListComponent } from './podcast-category-list/podcast-category-list.component';
import { PodcastCategoryAddComponent } from './podcast-category-add/podcast-category-add.component';
import { PodcastCategoryEditComponent } from './podcast-category-edit/podcast-category-edit.component';
import { PodcastCategoryDetailsComponent } from './podcast-category-details/podcast-category-details.component';

import { NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
declarations: [PodcastCategoryListComponent, PodcastCategoryAddComponent, PodcastCategoryEditComponent, PodcastCategoryDetailsComponent],
imports: [
CommonModule,
PodcastCategoryRoutingModule,
NgbCarouselModule,
NgbModule,
SharedModule,
ReactiveFormsModule,
FormsModule,
InfiniteScrollModule
]
})
export class PodcastCategoryModule { }