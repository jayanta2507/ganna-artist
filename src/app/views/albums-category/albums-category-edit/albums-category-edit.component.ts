import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute , Router } from '@angular/router';;
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-albums-category-edit',
  templateUrl: './albums-category-edit.component.html',
  styleUrls: ['./albums-category-edit.component.scss']
})
export class AlbumsCategoryEditComponent implements OnInit {
	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;


	albumCoverImage: any = 'assets/images/no_image.png'; 
	albumCoverImageObj:any;
	albumCoverImagePath: any = '';

	albumFile: any 	  = 'assets/images/no_image.png';
	albumFileObj:any ;
	albumFilePath: any = '';
	albumFileLength:any= 0
	progress: number  = 0;

	albumCatDetails:any  = [];
	currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";
	albumURL:any       = "";

	albumCatId:any     = "";

	imgURL:string     = environment.imageURL;
	imageStatus:number = 0;


	constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { 

		this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
	      this.albumCatId = atob(params['id']);
	      console.log(this.albumCatId)
	    }));
	}

	ngOnInit(): void {
		this.createAddForm();
		this.getAlbumCategory();
	}

	createAddForm() {
	    this.addForm = this._formBuilder.group({
			name: ['', [Validators.required, noSpace]],
			cover_picture: [''],
			details: ['', [Validators.required, noSpace]],
	    })
	}


	get f() {
		return this.addForm.controls;
	}


	// Upload Podcast Cover Image
  	coverImageCategoryUpload(event) {

	    if (event.target.files && event.target.files[0]) {

	      const mainFile: File = event.target.files[0];

	      if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && 
	      	event.target.files[0].type.split('/')[1] != 'jpeg') {

	        this.helperService.showError('Only JPG/JPEG/PNG files allowed');
	        return;
	      }	   

	      const reader = new FileReader();

	      reader.readAsDataURL(event.target.files[0]);
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
	            	this.imageStatus        = 0;
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

  	getAlbumCategory(){

	    this.subscriptions.push(
	      this.commonService.getAPICall({
	        url: 'album-category-details/'+this.albumCatId,
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	this.albumCatDetails = result.data;


	        	if (this.albumCatDetails.cover_image) {

					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.albumCatDetails.cover_image;

				}else{
					this.imgURL = "";
				}
				this.albumCoverImagePath = result.data.cover_image;


	        	this.addForm.patchValue({
            	   	name    : this.albumCatDetails.name,
            	   	details : this.albumCatDetails.details,
            	});

	        	console.log(this.albumCatDetails.name)
	          //this.helperService.showSuccess(result.msg);
	          //this.router.navigate(['/songs-category'])
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
  	submitAlbumCategory(){
  		this.formSubmitted = true;
		//console.log(this.addForm);
	    if(this.addForm.invalid) return;

		let postData = {
			name : this.addForm.get('name').value,
			cover_picture : this.albumCoverImagePath,
			details : this.addForm.get('details').value,
		}

	    this.subscriptions.push(
	      this.commonService.putAPICall({
	        url: 'update-album-category/'+this.albumCatId,
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
