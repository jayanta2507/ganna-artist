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
  selector: 'app-albums-category-details',
  templateUrl: './albums-category-details.component.html',
  styleUrls: ['./albums-category-details.component.scss']
})
export class AlbumsCategoryDetailsComponent implements OnInit {
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
	    //  console.log(this.albumCatId);
	    }));
	}

	ngOnInit(): void {
		
		this.getAlbumCategory();
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
  	

}
