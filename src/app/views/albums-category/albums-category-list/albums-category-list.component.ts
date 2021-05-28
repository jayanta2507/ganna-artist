import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-albums-category-list',
  templateUrl: './albums-category-list.component.html',
  styleUrls: ['./albums-category-list.component.scss']
})
export class AlbumsCategoryListComponent implements OnInit {


  subscriptions: Subscription[] = [];
  albumsCategoryList:any        = [];
  isLoading: boolean            = false;
  currentPage:any               = 1;
  searchText:any                = "";
  totalAlbumscategory: number   = 0;
  searchStatus:number           = 0;
    imageURL:any                 = environment.imageURL;
 

  constructor( private router:Router, 
              private _formBuilder: FormBuilder,
              private commonService: CommonService,
              private helperService: HelperService) { }

  ngOnInit(): void {
     this.getAlbumsCategoryList();
  }

  searchAlbumCategory(){
 
    if (this.searchText.length>3 && this.searchText!='') {
      this.currentPage = 1;
      this.albumsCategoryList = [];
      this.getAlbumsCategoryList();
    }

    if (this.searchText.length==0) {
      this.currentPage = 1;
      this.albumsCategoryList = [];
      this.searchText         = "";
      this.getAlbumsCategoryList();
    }

  }

  clearSearch(){
    this.currentPage = 1;
    this.albumsCategoryList = [];
    this.searchText         = "";
    this.getAlbumsCategoryList();
  }
  

  getAlbumsCategoryList(){
     if (this.searchStatus==0) {
        this.isLoading = true;
      }
      

      this.subscriptions.push(
        this.commonService.getAPICall({
          url :'album-category-list',
          data: {page: this.currentPage, search: this.searchText}
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {

            console.log(result)

            if(this.currentPage == 1) {
              this.albumsCategoryList = [];
            }

            for(let item of result.data.album_category_list) {


              item.image_path = this.imageURL + item.cover_image;
              this.albumsCategoryList.push(item);
            }
            
            this.totalAlbumscategory = result.data.totalCount;

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

   
  navigateToDetails(albumsCatId){
  	this.router.navigate(['albums-category/details/'+btoa(albumsCatId)])
  }


  navigateToEdit(albumsCatEditId){
  	this.router.navigate(['albums-category/edit/'+btoa(albumsCatEditId)])
  }


  openDeleteConfirmation(albumsCatId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this podcast ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.deleteAlbumsCategory(albumsCatId)
        } 
      })
  } 


  deleteAlbumsCategory(albumsCatId){
      this.isLoading = true;
      this.subscriptions.push(
        this.commonService.deleteAPICall({
          url :'delete-album-category/' + albumsCatId,
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {
            this.helperService.showSuccess(result.msg);
            this.currentPage = 1;
            this.albumsCategoryList = [];
            this.getAlbumsCategoryList();
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


  