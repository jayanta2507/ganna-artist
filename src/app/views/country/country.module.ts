import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryStatusChangeComponent } from './country-status-change/country-status-change.component';


@NgModule({
  declarations: [
    CountryListComponent,
    CountryAddComponent,
    CountryStatusChangeComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
