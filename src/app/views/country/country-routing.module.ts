import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddComponent } from './country-add/country-add.component';

import { CountryStatusChangeComponent } from './country-status-change/country-status-change.component';

const routes: Routes = [{

path: '',
data:{
	title: 'country'
},
children: [
      {
        path: '',
        component: CountryListComponent,
        data: {
          title: 'Country list'
        },
      },
       {
        path: 'add',
        component: CountryAddComponent ,
        data: {
          title: 'Country Add'
        },
      },
      {
        path: 'status-change',
        component: CountryStatusChangeComponent ,
        data: {
          title: 'Country Status Change'
        },
      }
]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
