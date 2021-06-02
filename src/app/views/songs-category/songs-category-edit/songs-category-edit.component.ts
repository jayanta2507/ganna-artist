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
  selector: 'app-songs-category-edit',
  templateUrl: './songs-category-edit.component.html',
  styleUrls: ['./songs-category-edit.component.scss']
})
export class SongsCategoryEditComponent implements OnInit {
	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;


	songCoverImage: any = 'assets/images/no_image.png'; 
	songCoverImageObj:any;
	songCoverImagePath: any = '';

	songFile: any 	  = 'assets/images/no_image.png';
	songFileObj:any;
	songFilePath: any = '';
	songFileLength:any= 0
	progress: number  = 0;

	songCatDetails:any  = [];
	currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";
	songURL:any       = "";

	songCatId:any     = "";

	imgURL:string     = environment.imageURL;
	imageStatus:number = 0;


	constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { 

		this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
	      this.songCatId = atob(params['id']);
	      console.log(this.songCatId)
	    }));
	}

	ngOnInit(): void {
		this.createAddForm();
		this.getSongCategory();
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


	// Upload Song Cover Image
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

	      
	      	this.songCoverImageObj = mainFile;

	      	let formData: FormData = new FormData();

	        this.isLoading = true
	        formData.append('file', this.songCoverImageObj, this.songCoverImageObj.name);

	        this.subscriptions.push(

	          this.commonService.postAPICall({
	            url: 'upload-song-category-cover-image',
	            data: formData
	          }).subscribe((result)=>{

	            this.isLoading = false;
	            if(result.status == 200) {
	            	this.imageStatus        = 0;
	              	this.songCoverImage     = event.target.result;
	              	this.songCoverImagePath = result.data.filePath;

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

  	getSongCategory(){

	    this.subscriptions.push(
	      this.commonService.getAPICall({
	        url: 'song-category-details/'+this.songCatId,
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	this.songCatDetails = result.data;


	        	if (this.songCatDetails.cover_image) {

					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.songCatDetails.cover_image;

				}else{
					this.imgURL = "";

				}
				this.songCoverImagePath = result.data.cover_image;

	        	this.addForm.patchValue({
            	   	name    : this.songCatDetails.name,
            	   	details : this.songCatDetails.details,
            	});

	        	console.log(this.songCatDetails.name)
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
  	submitSongCategory(){
  		this.formSubmitted = true;
		//console.log(this.addForm);
	    if(this.addForm.invalid) return;

		let postData = {
			name : this.addForm.get('name').value,
			cover_picture : this.songCoverImagePath,
			details : this.addForm.get('details').value,
		}

	    this.subscriptions.push(
	      this.commonService.putAPICall({
	        url: 'update-song-category/'+this.songCatId,
	        data: postData
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {
	          this.helperService.showSuccess(result.msg);
	          this.router.navigate(['/songs-category'])
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
