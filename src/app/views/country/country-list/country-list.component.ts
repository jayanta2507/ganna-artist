import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {


  subscriptions: Subscription[] = [];
  countryList:any        = [];
  isLoading: boolean            = false;
  currentPage:any               = 1;
  searchText:any                = "";
  totalCountryList: number   = 0;
  searchStatus:number           = 0;
  imageURL:any                 = environment.imageURL;
  sortKey: any = "";
  sortType: any = "";


  constructor( private router:Router, 
              private _formBuilder: FormBuilder,
              private commonService: CommonService,
              private helperService: HelperService) { }

  ngOnInit(): void {
        this.getCountryList();
  }



  searchCountry(){
 
    if (this.searchText.length>3 && this.searchText!='') {
      this.currentPage = 1;
      this.countryList = [];
      this.getCountryList();
    }

    if (this.searchText.length==0) {
      this.currentPage = 1;
      this.countryList = [];
      this.searchText         = "";
      this.getCountryList();
    }

  }

  clearSearch(){
    this.currentPage = 1;
    this.countryList = [];
    this.searchText         = "";
    this.getCountryList();
  }


  onScroll(){
    console.log("this is test")
    this.currentPage = this.currentPage + 1;
    this.getCountryList();

  }
  

getCountryList(){

 if (this.searchStatus==0) {
        this.isLoading = true;
      }
      

      this.subscriptions.push(
        this.commonService.getAdminAPICall({
          url :'country-list',
          data: { page: this.currentPage, search: this.searchText, sortKey: this.sortKey, sortType: this.sortType}
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {

             console.log(result.data.country_list)

            if(this.currentPage == 1) {
              this.countryList = [];
              console.log(this.countryList);

            }
   
           for(let item of result.data.country_list) {


           this.countryList.push(item);
            }
            
            this.totalCountryList = result.data.totalCount;
            this.searchStatus = 0;
          }
          else{
            this.helperService.showError(result.msg);
          }
        },(err)=>{
          this.isLoading = false;
          this.helperService.showError(err.error.msg);
        })
      )
}


}
