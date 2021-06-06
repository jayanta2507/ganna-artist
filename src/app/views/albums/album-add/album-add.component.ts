import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';;
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.scss']
})


export class AlbumAddComponent implements OnInit {

	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;
	albumImage: any = 'assets/images/no_image.png';
	albumImageObj:any;
	totalAlbums: number = 0;
    albumsCategoryList:any        = [];

    currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;

	constructor(
		private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router
	) {
		
	}

	ngOnInit(): void {
		this.createAddForm();
		this.getAlbumsCategoryList();
	}

	// Create Form
  	createAddForm() {
	    this.addForm = this._formBuilder.group({
	      name: ['', [Validators.required, noSpace]],
	      album_category_id: ['', [Validators.required, noSpace]],
	      file: ['']
	    })
	}

	// Upload Govt ID Front Page
  	coverAlbumUpload(event) {
	    if (event.target.files && event.target.files[0]) {
	      const mainFile: File = event.target.files[0];
	      if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && event.target.files[0].type.split('/')[1] != 'jpeg') {
	        this.helperService.showError('Only JPG/JPEG/PNG files allowed');
	        return;
	      }	   
	      const reader = new FileReader();
	      reader.readAsDataURL(event.target.files[0]); // read file as data url
	      reader.onload = (event) => { 
	      	this.albumImage = event.target.result;
	      	this.albumImageObj = mainFile;
	      };
	    }
  	}

	// Get Form Control
	get f() {
		return this.addForm.controls;
	}

 getAlbumsCategoryList(){
       
       this.isLoading = true;
     
      
      	this.subscriptions.push(
	        this.commonService.getAPICall({
	          url :'album-category-list',
	          data: {page: this.currentPage, search: this.searchText}
	        }).subscribe((result)=>{
	          this.isLoading = false;
	          if(result.status == 200) {

	            //console.log(result)

	            if(this.currentPage == 1) {
	              this.albumsCategoryList = [];
	            }

	            for(let item of result.data.album_category_list) {
	              this.albumsCategoryList.push(item);
	            }


	            console.log(this.albumsCategoryList)
	            

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



  	submitAlbum(){
  		
        this.formSubmitted = true;
	    if(this.addForm.invalid) return;

	    let formData: FormData = new FormData();
        formData.append('file', this.albumImageObj, this.albumImageObj.name);
        formData.append('name', this.addForm.get('name').value);
        formData.append('album_category_id', this.addForm.get('album_category_id').value);
	    this.subscriptions.push(
	      this.commonService.postAPICall({
	        url: 'create-album',
	        data: formData
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {
	          this.helperService.showSuccess(result.msg);
	          this.router.navigate(['/album'])
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
