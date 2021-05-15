import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsCategoryAddComponent } from './albums-category-add/albums-category-add.component';
import { AlbumsCategoryListComponent } from './albums-category-list/albums-category-list.component';

const routes: Routes = [{

path: '',
    data: {
      title: 'Albums Category'
    },
    children: [
{
  path: 'add',
  component: AlbumsCategoryAddComponent,
  data: {
   title: 'Albums Category Add'
       },
      },
       {
   path: '',
   component:  AlbumsCategoryListComponent ,
   data: {
     title: 'Albums Category List'
   },
},
      ]
      }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsCategoryRoutingModule { }

