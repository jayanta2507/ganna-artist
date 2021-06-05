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
	songCatDetails:any  = [];
	songCatId:any     = "";
	imgURL:string     = environment.imageURL;

	constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,
		private activatedRoute: ActivatedRoute) 
	{ 

		this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
	      this.songCatId = atob(params['id']);
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
					this.imgURL = this.imgURL + this.songCatDetails.cover_image;
				}else{
					this.imgURL = "";
				}
	    
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
