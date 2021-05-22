import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsCategoryListComponent } from './songs-category-list/songs-category-list.component';
import { SongsCategoryAddComponent } from './songs-category-add/songs-category-add.component';
import { SongsCategoryDetailsComponent } from './songs-category-details/songs-category-details.component';
import { SongsCategoryEditComponent } from './songs-category-edit/songs-category-edit.component'

const routes: Routes = [{
    path: '',
    data: {
      title: 'Songs Category'
    },
    children: [
      {
        path: '',
        component: SongsCategoryListComponent,
        data: {
          title: 'Songs Category List'
        },
      },
      {
        path: 'add',
        component: SongsCategoryAddComponent,
        data: {
          title: 'Songs Category Add'
        },
      },
       {
        path: 'details/:id',
        component:  SongsCategoryDetailsComponent ,
        data: {
          title: 'Songs Category Details'
        },
      },
      {
        path: 'edit/:id',
        component:  SongsCategoryEditComponent,
        data: {
          title: 'songs Category Edit'
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
export class SongsCategoryRoutingModule { }
