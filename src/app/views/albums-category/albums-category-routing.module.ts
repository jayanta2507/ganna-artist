import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsCategoryAddComponent } from './albums-category-add/albums-category-add.component';
import { AlbumsCategoryListComponent } from './albums-category-list/albums-category-list.component';
import { AlbumsCategoryEditComponent} from './albums-category-edit/albums-category-edit.component';
import { AlbumsCategoryDetailsComponent} from './albums-category-details/albums-category-details.component';

const routes: Routes = [{
    path: '',
    data: {
      title: 'Albums Category'
    },
    children: [
      {
        path: '',
        component: AlbumsCategoryListComponent,
        data: {
          title: 'Albums Category List'
        },
      },
      {
        path: 'add',
        component: AlbumsCategoryAddComponent,
        data: {
          title: 'Albums Category Add'
        },
      },
       {
        path: 'details/:id',
        component: AlbumsCategoryDetailsComponent ,
        data: {
          title: 'Albums Category Details'
        },
      },
      {
        path: 'edit/:id',
        component:  AlbumsCategoryEditComponent,
        data: {
          title: 'Albums Category Edit'
        },
      },
     
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsCategoryRoutingModule { }

