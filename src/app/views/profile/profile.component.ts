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
	profileCoverImagePath: any = '';

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


 
  constructor(private fb: FormBuilder,
    private helperService: HelperService,
    private commonService: CommonService,
    private router: Router,
    public afAuth: AngularFireAuth,) { }

  ngOnInit(): void {
  	this.createProfileForm();
	this.getProfileDetails();
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
	getProfileDetails(){

	    this.subscriptions.push(
	      this.commonService.getAPICall({
	        url: 'artist-details',
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {

	        	this.profileDetails = result.data;
	        	if (this.profileDetails.profile_image) {

					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.profileDetails.profile_image;

				}else{
					this.imgURL = "";
				}
				this.profileCoverImagePath = result.data.profile_image;



				
	        	this.profileForm.patchValue({
            	   	full_name   : this.profileDetails.full_name,
            	   	email       : this.profileDetails.email,
            	   	dob         : this.profileDetails.dob,
            	   	country_id  : this.profileDetails.country_id,
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
