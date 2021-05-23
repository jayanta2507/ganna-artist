import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-songs-category-list',
  templateUrl: './songs-category-list.component.html',
  styleUrls: ['./songs-category-list.component.scss']
})
export class SongsCategoryListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  songsCategoryList:any         = [];
  isLoading: boolean            = false;
  currentPage:any               = 1;
  searchText:any                = "";
  totalSongscategory: number    = 0;
  searchStatus:number           = 0;
 


  constructor(private router:Router, 
              private _formBuilder: FormBuilder,
              private commonService: CommonService,
              private helperService: HelperService) { }

  ngOnInit(): void {
    this.getSongsCategoryList();
  }
   searchSongCategory(){
 
    if (this.searchText.length>3 && this.searchText!='') {
      this.currentPage = 1;
      this.songsCategoryList = [];
      this.getSongsCategoryList();
    }

    if (this.searchText.length==0) {
      this.currentPage = 1;
      this.songsCategoryList = [];
      this.searchText         = "";
      this.getSongsCategoryList();
    }

  }

  clearSearch(){
    this.currentPage = 1;
    this.songsCategoryList = [];
    this.searchText         = "";
    this.getSongsCategoryList();
  }
  


   
  getSongsCategoryList(){
     if (this.searchStatus==0) {
        this.isLoading = true;
      }
      

      this.subscriptions.push(
        this.commonService.getAPICall({
          url :'song-category-list',
          data: {page: this.currentPage, search: this.searchText}
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {

            console.log(result)

            if(this.currentPage == 1) {
              this.songsCategoryList = [];
            }

            for(let item of result.data.album_category_list) {
              this.songsCategoryList.push(item);
            }
            
            this.totalSongscategory = result.data.totalCount;

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

  navigateToDetails(songCatId){
  		this.router.navigate(['songs-category/details/'+btoa(songCatId)])

  }
  navigateToEdit(songCatEditId){
         this.router.navigate(['songs-category/edit/'+btoa(songCatEditId)])
  }
  openDeleteConfirmation(songCatId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this song ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteSongsCategory(songCatId)
      } 
    })
  }

  deleteSongsCategory(songsCatId){
      this.isLoading = true;
      this.subscriptions.push(
        this.commonService.deleteAPICall({
          url :'delete-song-category/' + songsCatId,
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {
            this.helperService.showSuccess(result.msg);
            this.currentPage = 1;
            this.songsCategoryList = [];
            this.getSongsCategoryList();
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
