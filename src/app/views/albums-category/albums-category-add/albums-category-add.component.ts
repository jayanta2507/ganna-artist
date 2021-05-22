import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';;
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-albums-category-add',
  templateUrl: './albums-category-add.component.html',
  styleUrls: ['./albums-category-add.component.scss']
})
export class AlbumsCategoryAddComponent implements OnInit {

    addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;

    currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";
	albumURL:any      = "";

  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router) { }

  ngOnInit(): void {
  	this.createAddForm();
  }
   createAddForm() {
	    this.addForm = this._formBuilder.group({
			name: ['', [Validators.required, noSpace]],
  })
	}
	submitCreateAlbumsCategory(){
		this.formSubmitted = true;
		
	    if(this.addForm.invalid) return;

		let postData = {
			name : this.addForm.get('name').value,
		}

	    this.subscriptions.push(
	      this.commonService.postAPICall({
	        url: 'album-category-add',
	        data: postData
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {
	          this.helperService.showSuccess(result.msg);
	          this.router.navigate(['/albums-category'])
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

