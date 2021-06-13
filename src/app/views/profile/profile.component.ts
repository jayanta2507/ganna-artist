import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/Common/common.service';
import { HelperService } from '../../core/services/Helper/helper.service';
import { noSpace } from '../../shared/custom-validators/nospacesvalidator';
import { environment } from '../../../environments/environment';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from '../../core/guards/auth-guard.service';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	profileForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;

	profileCoverImage: any = 'assets/images/no_image.png'; 
	profileCoverImageObj:any;
	

	profileFile: any 	  = 'assets/images/no_image.png';
	profileFileObj:any ;
	profileFilePath: any = '';
	profileFileLength:any= 0
	progress: number  = 0;

	imgURL:string     = environment.imageURL; 
	imageStatus:number = 0;


    profileDetails:any  = [];
	currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";

	profileImage:any  = '';
	profileImageObj:any;
	profileCoverImagePath: any = '';

	countries:any     = [];

 
  constructor(private fb: FormBuilder,
    private helperService: HelperService,
    private commonService: CommonService,
    private router: Router,
    public afAuth: AngularFireAuth,) { }

  ngOnInit(): void {
  	this.createProfileForm();
	this.getProfileDetails();
	this.getCountries();
  }

  createProfileForm() {
	    this.profileForm = this.fb.group({
			full_name: ['', [Validators.required, noSpace]],
			email: ['', [Validators.required, noSpace]],
			dob: ['', [Validators.required, noSpace]],
			country_id: ['', [Validators.required, noSpace]],
			profile_image: [''],
			mobile_no:['', [Validators.required, noSpace]],	
	    })
	}


	get f() {
		return this.profileForm.controls;
	}


	profileImageUpload(event) {
	    if (event.target.files && event.target.files[0]) {
	      const mainFile: File = event.target.files[0];
	      if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && event.target.files[0].type.split('/')[1] != 'jpeg') {
	        this.helperService.showError('Only JPG/JPEG/PNG files allowed');
	        return;
	      }	   
	      const reader = new FileReader();
	      reader.readAsDataURL(event.target.files[0]); // read file as data url
	      reader.onload = (event) => { 
	      	this.profileImage = event.target.result;
 
	      	let formData: FormData = new FormData();

		    this.isLoading = true
		    formData.append('file', mainFile, mainFile.name);
		    this.subscriptions.push(
		      this.commonService.postAPICall({
		        url: 'artist-details/upload-profile-picture',
		        data: formData
		      }).subscribe((result)=>{
		        this.isLoading = false;
		        if(result.status == 200) {
		          this.profileImage = event.target.result;
		          this.profileCoverImagePath = result.data.filePath;
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


	getProfileDetails(){

	    this.subscriptions.push(
	      this.commonService.getAPICall({
	        url: 'artist-details',
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	this.profileDetails = result.data;
	        	if (this.profileDetails.artist_details.profile_image) {

					this.imageStatus = 1;
					this.profileImage = this.imgURL + this.profileDetails.artist_details.profile_image;

				}else{
					this.profileImage = "";
				}

				this.profileCoverImagePath = result.data.artist_details.profile_image;
				
	        	this.profileForm.patchValue({
            	   	full_name   : this.profileDetails.artist_details.full_name,
            	   	email       : this.profileDetails.artist_details.email,
            	   	dob         : this.profileDetails.artist_details.dob,
            	   	country_id  : this.profileDetails.artist_details.country_id,
            	   	mobile_no   : this.profileDetails.artist_details.mobile_no
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



  	getCountries(){

	    this.subscriptions.push(
	      this.commonService.getAPICall({
	        url: 'countries',
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	 this.countries = result.data.countries;
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


  	updateProfile(){

  		this.formSubmitted = true;

  		if (this.profileForm.status=='INVALID') {
  			return true;
  		}
  		this.isLoading = true;


  		let postData = {
			full_name : this.f.full_name.value.toString(),
			mobile_no : this.f.mobile_no.value.toString(),
			dob : moment(this.profileForm.get('dob').value).format('YYYY-MM-DD'),
			country_id : this.f.country_id.value.toString(),
			profile_image : this.profileCoverImagePath
  		}

        this.subscriptions.push(
	      this.commonService.putAPICallUpdate({
	        url: 'update-artist-profile',
	        data: postData,
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	this.helperService.showSuccess(result.msg);
	        	this.getProfileDetails();

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
