import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute , Router } from '@angular/router';;
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';


@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {

	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;

	artistCoverImage: any = 'assets/images/no_image.png'; 
	artistCoverImageObj:any;
	artistCoverImagePath: any = '';

	artistFile: any 	  = 'assets/images/no_image.png';
	artistFileObj:any ;
	artistFilePath: any = '';
	artistFileLength:any= 0
	progress: number  = 0;

    artistDetails:any  = [];
	currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";
	artistURL:any       = "";


	artistId:any     = "";
	countries:any     = [];

    songURL:string    = environment.songURL;
	imgURL:string     = environment.imageURL;
	imageStatus:number = 0;



  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { 

  	this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
	      this.artistId = atob(params['id']);
	    //  console.log(this.albumCatId);
	    }));


  }

  ngOnInit(): void {
  	this.getArtist();
  	this.createArtistForm();
  	//this.getCountries();
  }
   


   // 	getCountries(){

	  //   this.subscriptions.push(
	  //     this.commonService.getAPICall({
	  //       url: 'countries',
	  //     }).subscribe((result)=>{
	  //       this.isLoading = false;
	  //       if(result.status == 200) {

	  //       	 this.countries = result.data.countries;
	  //       }
	  //       else{
	  //         this.helperService.showError(result.msg);
	  //       }
	  //     },(err)=>{
	  //       this.isLoading = false;
	  //       this.helperService.showError(err.error.msg);
	  //     })
	  //   )
  	// }


    createArtistForm() {
	    this.addForm = this._formBuilder.group({
			full_name: ['', [Validators.required, noSpace]],
			email: ['', [Validators.required, noSpace]],
			dob: ['', [Validators.required, noSpace]],
			country_id: ['', [Validators.required, noSpace]],
			profile_image: [''],
			mobile_no:['', [Validators.required, noSpace]],	
	    })
	}


	get f() {
		return this.addForm.controls;
	}



  getArtist(){

	    this.subscriptions.push(
	      this.commonService.getAdminAPICall({
	        url: 'artist-details/'+this.artistId,
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	this.artistDetails = result.data;
	        	console.log(this.artistDetails);

	        	console.log(this.artistDetails.artist_details.full_name);


	        	if (this.artistDetails.artist_details.profile_image) {

					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.artistDetails.artist_details.profile_image;

				}else{
					this.imgURL = "";
				}
				this.artistCoverImagePath = result.data.artist_details.profile_image;

				if (this.artistDetails.artist_details.artist_account_details.sample_song_path) {
	          	this.songURL  = this.songURL  + this.artistDetails.artist_details.artist_account_details.sample_song_path;
	          }else{
	          	this.songURL  = "";
	          }

	            this.artistDetails.artist_details.song_url = environment.songURL + this.artistDetails.artist_details.artist_account_details.sample_song_path;


                console.log(this.artistDetails.artist_details.song_url);
	        	this.addForm.patchValue({
            	    full_name   : this.artistDetails.artist_details.name,
            	   	email       : this.artistDetails.artist_details.email,
            	   	dob         : this.artistDetails.artist_details.dob, 
            	   	country_id  : this.artistDetails.artist_details.country_id,
            	   	mobile_no   : this.artistDetails.artist_details.mobile_no,
            	   	building_no : this.artistDetails.artist_details.artist_account_details.building_no,
            	   	street      : this.artistDetails.artist_details.artist_account_details.street,
            	   	city        : this.artistDetails.artist_details.artist_account_details.city,
            	   	state       : this.artistDetails.artist_details.artist_account_details.state,
            	   	zip         : this.artistDetails.artist_details.artist_account_details.zip,
            	   	account_holder_name: this.artistDetails.artist_details.artist_account_details.account_holder_name,
            	   	account_number: this.artistDetails.artist_details.artist_account_details.account_number,
            	   	country      : this.artistDetails.artist_details.country.name,
            	   	bank_city    : this.artistDetails.artist_details.artist_account_details.bank_city,
            	   	bank_zip     : this.artistDetails.artist_details.artist_account_details.bank_zip,
            	   	routing_no   : this.artistDetails.artist_details.artist_account_details.routing_no,
            	   	currency     : this.artistDetails.artist_details.artist_account_details.currency,
            	   	govt_id_back : this.artistDetails.artist_details.artist_account_details.govt_id_back,
            	   	sample_song_name : this.artistDetails.artist_details.artist_account_details.sample_song_name,
            	   	sample_song_description: this.artistDetails.artist_details.artist_account_details.sample_song_description
            

            	});

	        	//console.log(this.artistDetails.artistDetails.full_name)
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
