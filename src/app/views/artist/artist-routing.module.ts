import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtistComponent} from './artist.component';

const routes: Routes = [{

path: '',
component: ArtistComponent,

data:{
	title: 'artist'

}




}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
