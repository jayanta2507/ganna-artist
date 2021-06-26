import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreAddComponent } from './genre-add/genre-add.component';


const routes: Routes = [{
	path: '',
	data: {
		title: 'country'
	},
	children: [
	{
		path: '',
        component: GenreListComponent,
        data: {
          title: 'Genre list'
	},
},
	{
		path: 'add',
        component: GenreAddComponent,
        data: {
          title: 'Genre add'
	},
}
	]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
