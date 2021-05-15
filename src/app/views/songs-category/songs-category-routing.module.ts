import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { SongAddComponent } from './song-add/song-add.component';
import { SongEditComponent} from './song-edit/song-edit.component';
import { SongDetailsComponent } from './song-details/song-details.component';

const routes: Routes = [{
    path: '',
    data: {
      title: 'Song-Category'
    },
    children: [
      {
        path: '',
        component: SongListComponent,
        data: {
          title: 'Song-Category List'
        },
      },
       {
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
      },
     
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsCategoryRoutingModule { }
 