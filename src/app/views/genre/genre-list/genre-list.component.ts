import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {


  subscriptions: Subscription[] = [];
  genreList:any        = [];
  isLoading: boolean            = false;
  currentPage:any               = 1;
  searchText:any                = "";
  totalGenreList: number   = 0;
  searchStatus:number           = 0;
  imageURL:any                 = environment.imageURL;
  sortKey: any = "";
  sortType: any = "";


  constructor( private router:Router, 
              private _formBuilder: FormBuilder,
              private commonService: CommonService,
              private helperService: HelperService) { }

  ngOnInit(): void {
        this.getGenreList();
  }



  searchGenre(){
 
    if (this.searchText.length>3 && this.searchText!='') {
      this.currentPage = 1;
      this.genreList = [];
      this.getGenreList();
    }

    if (this.searchText.length==0) {
      this.currentPage = 1;
      this.genreList = [];
      this.searchText         = "";
      this.getGenreList();
    }

  }

  clearSearch(){
    this.currentPage = 1;
    this.genreList = [];
    this.searchText         = "";
    this.getGenreList();
  }

getGenreList(){

 if (this.searchStatus==0) {
        this.isLoading = true;
      }
      

      this.subscriptions.push(
        this.commonService.getAdminAPICall({
          url :'genre-list',
          data: { page: this.currentPage, search: this.searchText, sortKey: this.sortKey, sortType: this.sortType}
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {

             console.log(result.data.country_list)

            if(this.currentPage == 1) {
              this.genreList = [];
              console.log(this.genreList);

            }
   
           for(let item of result.data.genre_list) {


           this.genreList.push(item);
            }
            
            this.totalGenreList = result.data.totalCount;
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


openDeleteConfirmation(genreId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this podcast ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.deleteGenre(genreId)
        } 
      })
  } 
 

  deleteGenre(genreId){
      this.isLoading = true;
      this.subscriptions.push(
        this.commonService.deleteAdminAPICall({
          url :'delete-genre/' + genreId,
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {
            this.helperService.showSuccess(result.msg);
            this.currentPage = 1;
            this.genreList = [];
            this.getGenreList();
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
