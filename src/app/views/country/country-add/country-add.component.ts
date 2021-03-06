import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import { environment } from '../../../../environments/environment';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from '../../../core/guards/auth-guard.service';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {

	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;
	progress: number  = 0;

	currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";


	countries:any     = [];

 
  constructor(private fb: FormBuilder,
    private helperService: HelperService,
    private commonService: CommonService,
    private router: Router,
    public afAuth: AngularFireAuth,) { }

  ngOnInit(): void {
  	this.createAddForm();
	
  }

  createAddForm() {
	    this.addForm = this.fb.group({
			
			name: ['', [Validators.required, noSpace]],
			country_code:['', [Validators.required, noSpace]],
			telephone_code:['', [Validators.required, noSpace]],
	    })
	}


	get f() {
		return this.addForm.controls;

	}



  	submitCountry(){
  		this.formSubmitted = true;
  		console.log(this.addForm);
		
	    if(this.addForm.invalid) return;

		let postData = {
			name : this.addForm.get('name').value,
			country_code: this.addForm.get('country_code').value,
			telephone_code: this.addForm.get('telephone_code').value,
			
		}

	    this.subscriptions.push(
	      this.commonService.postAdminAPICall({
	        url: 'country-add',
	        data: postData
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {
	          this.helperService.showSuccess(result.msg);
	          this.router.navigate(['/country'])
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
