import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtistComponent} from './artist.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';

const routes: Routes = [{

path: '',
data:{
	title: 'artist'
},
children: [
      {
        path: '',
        component: ArtistComponent,
        data: {
          title: 'Artist List'
        },
      },
       {
        path: 'details/:id',
        component: ArtistDetailsComponent ,
        data: {
          title: 'Artist Details'
        },
      },

]



}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
