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
  selector: 'app-songs-category-add',
  templateUrl: './songs-category-add.component.html',
  styleUrls: ['./songs-category-add.component.scss']
})
export class SongsCategoryAddComponent implements OnInit {

	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;


	songCoverImage: any = 'assets/images/no_image.png';
	songCoverImageObj:any;
	songCoverImagePath: any = '';

	songFile: any 	  = 'assets/images/no_image.png';
	songFileObj:any;
	songFilePath: any = '';
	songFileLength:any= 0
	progress: number  = 0;

	albumDataList     = [];
	currentPage:any   = 1;
	searchText:any    = "";
	sortKey:any       = 2;
	sortType:any      = "DESC";
	songURL:any       = "";


	genreList = [];

  	constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router) {  }

  	ngOnInit(): void {
  		this.createAddForm();
  	}


  	createAddForm() {
	    this.addForm = this._formBuilder.group({
			name: ['', [Validators.required, noSpace]],
			cover_picture: ['', [Validators.required, noSpace]],
			details: ['', [Validators.required, noSpace]],
	    })

	    //console.log(this.addForm)
	}


    get f() {
		return this.addForm.controls;
	}


	// Upload Song Cover Image
  	coverImageCategoryUpload(event) {




	    if (event.target.files && event.target.files[0]) {

	      const mainFile: File = event.target.files[0];

	      

	   

	      if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && 
	      	event.target.files[0].type.split('/')[1] != 'jpeg') {

	        this.helperService.showError('Only JPG/JPEG/PNG files allowed');
	        return;
	      }	   


	      const reader = new FileReader();

	      //console.log(reader)


	      reader.readAsDataURL(event.target.files[0]);
	      reader.onload = (event) => { 

	      
	      	this.songCoverImageObj = mainFile;

	      	let formData: FormData = new FormData();

	        this.isLoading = true

	        formData.append('file', this.songCoverImageObj, this.songCoverImageObj.name);



	        this.subscriptions.push(

	          this.commonService.postAPICall({
	            url: 'upload-song-category-cover-image',
	            data: formData
	          }).subscribe((result)=>{

	            this.isLoading = false;
	            if(result.status == 200) {

	              this.songCoverImage     = event.target.result;
	              this.songCoverImagePath = result.data.filePath;

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


	submitSongCategory(){
		this.formSubmitted = true;
		//console.log(this.addForm);
	    if(this.addForm.invalid) return;

		let postData = {
			name : this.addForm.get('name').value,
			cover_picture : this.songCoverImagePath,
			details : this.addForm.get('details').value,
		}

	    this.subscriptions.push(
	      this.commonService.postAPICall({
	        url: 'song-category-add',
	        data: postData
	      }).subscribe((result)=>{
	        this.isLoading = false;
	        if(result.status == 200) {
	          this.helperService.showSuccess(result.msg);
	          this.router.navigate(['/songs-category'])
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
