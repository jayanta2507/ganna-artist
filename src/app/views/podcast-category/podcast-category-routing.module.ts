import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastCategoryListComponent } from './podcast-category-list/podcast-category-list.component';
import { PodcastCategoryAddComponent } from './podcast-category-add/podcast-category-add.component';
import { PodcastCategoryDetailsComponent } from './podcast-category-details/podcast-category-details.component';
import { PodcastCategoryEditComponent } from './podcast-category-edit/podcast-category-edit.component'

const routes: Routes = [{
    path: '',
    data: {
      title: 'Podcast Category'
    },
    children: [
      {
        path: '',
        component: PodcastCategoryListComponent,
        data: {
          title: 'Podcast Category List'
        },
      },
      {
        path: 'add',
        component: PodcastCategoryAddComponent,
        data: {
          title: 'Podcast Category Add'
        },
      },
       {
        path: 'details/:id',
        component:  PodcastCategoryDetailsComponent ,
        data: {
          title: 'Podcast Category Details'
        },
      },
      {
        path: 'edit/:id',
        component:  PodcastCategoryEditComponent,
        data: {
          title: 'Podcast Category Edit'
        },
      },
      /* {
        path: 'details/:id',
        component:  SongDetailsComponent ,
        data: {
          title: 'Song Details'
        },
      },
      {
        path: 'edit/:id',
        component: SongEditComponent,
        data: {
          title: 'Song Edit'
        },
      },
      {
        path: 'add',
        component: SongAddComponent,
        data: {
          title: 'Song Add'
        },
      },*/
     
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastCategoryRoutingModule { }
