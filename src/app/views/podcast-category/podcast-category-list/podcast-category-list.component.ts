import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
selector: 'app-podcast-category-list',
templateUrl: './podcast-category-list.component.html',
styleUrls: ['./podcast-category-list.component.scss']
})


export class PodcastCategoryListComponent implements OnInit {


subscriptions: Subscription[] = [];
podcastCategoryList:any = [];
isLoading: boolean = false;
currentPage:any = 1;
searchText:any = "";
totalpodcastcategory: number = 0;
searchStatus:number = 0;
imageURL:any = environment.imageURL;


constructor(
private router:Router,
private _formBuilder: FormBuilder,
private commonService: CommonService,
private helperService: HelperService
) { }

ngOnInit(): void {
this.getGategoryList();
}


getGategoryList(){
if (this.searchStatus==0) {
this.isLoading = true;
}


this.subscriptions.push(
this.commonService.getAPICall({
url :'podcast-category-list',
data: {page: this.currentPage, search: this.searchText}
}).subscribe((result)=>{
this.isLoading = false;
if(result.status == 200) {

console.log(result)

if(this.currentPage == 1) {
this.podcastCategoryList = [];
}

for(let item of result.data.podcast_category_list) {

item.image_path = this.imageURL + item.cover_image;
this.podcastCategoryList.push(item);
}

this.totalpodcastcategory = result.data.totalCount;

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

navigateToDetails(podcastCatId){
this.router.navigate(['podcast-category/details/'+btoa(podcastCatId)])
}
navigateToEdit(podcastCatEditId){
this.router.navigate(['podcast-category/edit/'+btoa(podcastCatEditId)])
}


openDeleteConfirmation(podcastCatId) {
Swal.fire({
title: 'Are you sure?',
text: 'You want to delete this podcast ?',
icon: 'warning',
showCancelButton: true,
confirmButtonText: 'Yes',
cancelButtonText: 'No, keep it'
}).then((result) => {
if (result.value) {
this.deletePodcastCategory(podcastCatId)
}
})
}


deletePodcastCategory(podcastCatId){
this.isLoading = true;

this.subscriptions.push(
this.commonService.deleteAPICall({
url :'delete-podcast-category/' + podcastCatId,
}).subscribe((result)=>{
this.isLoading = false;
if(result.status == 200) {
this.helperService.showSuccess(result.msg);
this.currentPage = 1;
this.podcastCategoryList = [];
this.getGategoryList();
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