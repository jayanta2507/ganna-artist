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
  selector: 'app-podcast-category-edit',
  templateUrl: './podcast-category-edit.component.html',
  styleUrls: ['./podcast-category-edit.component.scss']
})
export class PodcastCategoryEditComponent implements OnInit {
	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;


	podcastCoverImage: any = 'assets/images/no_image.png'; 
	podcastCoverImageObj:any;
	podcastCoverImagePath: any = '';

	podcastFile: any 	  = 'assets/images/no_image.png';
	podcastFileObj:any;
	podcastFilePath: any = '';
	podcastFileLength:any= 0
	progress: number  = 0;

	podcastCatDetails:any  = [];
	currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";
	podcastURL:any       = "";

	podcastCatId:any     = "";

	imgURL:string     = environment.imageURL;
	imageStatus:number = 0;


	constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { 

		this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
	      this.podcastCatId = atob(params['id']);
	      console.log(this.podcastCatId)
	    }));
	}

	ngOnInit(): void {
		this.createAddForm();
		this.getPodcastCategory();
	}

	createAddForm() {
	    this.addForm = this._formBuilder.group({
			name: ['', [Validators.required, noSpace]],
			cover_picture: ['', [Validators.required, noSpace]],
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

	      
	      	this.podcastCoverImageObj = mainFile;

	      	let formData: FormData = new FormData();

	        this.isLoading = true
	        formData.append('file', this.podcastCoverImageObj, this.podcastCoverImageObj.name);

	        this.subscriptions.push(

	          this.commonService.postAPICall({
	            url: 'upload-podcast-category-cover-image',
	            data: formData
	          }).subscribe((result)=>{

	            this.isLoading = false;
	            if(result.status == 200) {
	            	this.imageStatus        = 0;
	              	this.podcastCoverImage     = event.target.result;
	              	this.podcastCoverImagePath = result.data.filePath;

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

  	getPodcastCategory(){

	    this.subscriptions.push(
	      this.commonService.getAPICall({
	        url: 'podcast-category-details/'+this.podcastCatId,
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	this.podcastCatDetails = result.data;


	        	if (this.podcastCatDetails.cover_image) {

					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.podcastCatDetails.cover_image;

				}else{
					this.imgURL = "";
				}

	        	this.addForm.patchValue({
            	   	name    : this.podcastCatDetails.name,
            	   	details : this.podcastCatDetails.details,
            	});

	        	console.log(this.podcastCatDetails.name)
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

}
