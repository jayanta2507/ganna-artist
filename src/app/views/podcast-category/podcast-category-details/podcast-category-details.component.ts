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
  selector: 'app-podcast-category-details',
  templateUrl: './podcast-category-details.component.html',
  styleUrls: ['./podcast-category-details.component.scss']
})
export class PodcastCategoryDetailsComponent implements OnInit {
	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;


	podcastCoverImage: any = 'assets/images/no_image.png'; 
	podcastCoverImageObj:any;
	podcastCoverImagePath: any = '';

	podcastFile: any 	  = 'assets/images/no_image.png';
	podcastFileObj:any ;
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
	    //  console.log(this.albumCatId);
	    }));
	}

	ngOnInit(): void {
		
		this.getPodcastCategory();
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
				this.podcastCoverImagePath = result.data.cover_image;


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
