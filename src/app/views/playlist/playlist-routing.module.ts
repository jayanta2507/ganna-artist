import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistAddComponent } from './playlist-add/playlist-add.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { PlaylistEditComponent } from './playlist-edit/playlist-edit.component';

const routes: Routes = [

{
    path: '',
    data: {
      title: 'playlist'
    },
  
    children: [{
    path: '',
    component: PlaylistListComponent,
    data: {
      title: 'Playlist List'
    },
  },
    {
      path: 'add',
      component: PlaylistAddComponent,
      data: {
        title: 'Playlist Add'
      },
    },

    {
      path:'details',      
      component: PlaylistDetailsComponent,
      data: {
        title: 'Playlist Details'
      },
    },
    {
      path: 'edit',
      component:  PlaylistEditComponent,
      data: {
        title: 'playlist Edit'
      },

    },
    ]

  
}
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
