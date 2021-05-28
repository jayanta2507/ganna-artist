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
  selector: 'app-albums-category-add',
  templateUrl: './albums-category-add.component.html',
  styleUrls: ['./albums-category-add.component.scss']
})
export class AlbumsCategoryAddComponent implements OnInit {

    addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;

	albumCoverImage: any 		= 'assets/images/no_image.png';
	albumCoverImageObj:any;
	albumCoverImagePath: any 	= '';

	albumFile: any 	  		= 'assets/images/no_image.png';
	albumFileObj:any;
	albumFilePath: any 		= '';
	albumFileLength:any		= 0
	progress: number  = 0;
 
   albumCategories = [];

    currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";
	albumURL:any      = "";

  	constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router) { }

  	ngOnInit(): void {
  		this.createAddForm();
  	}


   	createAddForm() {
	    this.addForm = this._formBuilder.group({
			name: ['', [Validators.required, noSpace]],
			cover_picture: ['', [Validators.required, noSpace]],
			details: ['', [Validators.required, noSpace]],
  		})
	}



	get f(){
		return this.addForm.controls;
	}


	coverImageAlbumUpload(event) {
	    if (event.target.files && event.target.files[0]) {
	      const mainFile: File = event.target.files[0];
	      if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && event.target.files[0].type.split('/')[1] != 'jpeg') {
	        this.helperService.showError('Only JPG/JPEG/PNG files allowed');
	        return;
	      }	   
	      const reader = new FileReader();
	      reader.readAsDataURL(event.target.files[0]); // read file as data url
	      reader.onload = (event) => { 
	      
	      	this.albumCoverImageObj = mainFile;

	      	let formData: FormData = new FormData();

	        this.isLoading = true
	        formData.append('file', this.albumCoverImageObj, this.albumCoverImageObj.name);
	        this.subscriptions.push(
	          this.commonService.postAPICall({
	            url: 'upload-album-category-cover-image',
	            data: formData
	          }).subscribe((result)=>{
	            this.isLoading = false;
	            if(result.status == 200) {
	              this.albumCoverImage     = event.target.result;
	              this.albumCoverImagePath = result.data.filePath;
	            }
	            else{
	              this.helperService.showError(result.msg);
	            }
	          },(err)=>{
	            this.isLoading = false;
	            this.helperService.showError(err.error.msg);
	          })
	        )	      	
	      };
	    }
  	}




	submitCreateAlbumsCategory(){
		this.formSubmitted = true;
		
	    if(this.addForm.invalid) return;

		let postData = {
			name : this.addForm.get('name').value,
			cover_picture : this.albumCoverImagePath,
			details : this.addForm.get('details').value,
		}

	    this.subscriptions.push(
	      this.commonService.postAPICall({
	        url: 'album-category-add',
	        data: postData
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {
	          this.helperService.showSuccess(result.msg);
	          this.router.navigate(['/albums-category'])
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

