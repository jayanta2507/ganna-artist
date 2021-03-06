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
  selector: 'app-songs-category-details',
  templateUrl: './songs-category-details.component.html',
  styleUrls: ['./songs-category-details.component.scss']
})
export class SongsCategoryDetailsComponent implements OnInit {
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;
    addForm: FormGroup;
	formSubmitted: boolean = false;

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
		this.getSongCategory();
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
