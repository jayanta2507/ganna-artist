import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongsCategoryListComponent } from './songs-category-list/songs-category-list.component';
import { SongsCategoryAddComponent } from './songs-category-add/songs-category-add.component';
import { SongsCategoryEditComponent} from './songs-category-edit/songs-category-edit.component';
import { SongsCategoryDetailsComponent } from './songs-category-details/songs-category-details.component';


const routes: Routes = [{
    path: '',
    data: {

      title: 'Song-Category'

    },
    children: [
      {
        path: '',

        component: SongsCategoryListComponent,
        data: {
          title: 'Song-Category List'
        },
      },
       {
        path: 'details/:id',
        component:  SongsCategoryDetailsComponent ,

        data: {
          title: 'Song Details'
        },
      },
      {
        path: 'edit/:id',

        component: SongsCategoryEditComponent,
        data: {
          title: 'Song Edit'
        },
      },
      {
        path: 'add',
        component: SongsCategoryAddComponent,
        data: {
          title: 'Song Add'
        },
      },
     

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsCategoryRoutingModule { }

