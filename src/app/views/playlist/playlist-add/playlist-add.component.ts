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
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.scss']
})
export class PlaylistAddComponent implements OnInit {

  addForm: FormGroup;
  formSubmitted: boolean = false;
  subscriptions: Subscription[] = [];
  isLoading: boolean = false;

  playlistCoverImage: any    = 'assets/images/no_image.png';
  playlistCoverImageObj:any;
  playlistCoverImagePath: any  = '';

  playlistFile: any        = 'assets/images/no_image.png';
  playlistFileObj:any;
  playlistFilePath: any    = '';
  playlistFileLength:any   = 0
  progress: number  = 0;
 
   playlist = [];

    currentPage:any   = 1;
  searchText:any    = "";
  sortKey:any       = 2;
  sortType:any      = "DESC";
  playlistURL:any      = "";

  constructor(private _formBuilder: FormBuilder,
private commonService: CommonService,
private helperService: HelperService,
private router: Router
              ) { }

  ngOnInit(): void {

    this.createAddForm();


  }

  createAddForm() {
this.addForm = this._formBuilder.group({
name: ['', [Validators.required, noSpace]],
cover_picture: ['', [Validators.required, noSpace]],
details: ['', [Validators.required, noSpace]],
})
}


    get f(){
    return this.addForm.controls;

}

   coverImagePlaylistUpload(event) {
if (event.target.files && event.target.files[0]) {
const mainFile: File = event.target.files[0];
if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && event.target.files[0].type.split('/')[1] != 'jpeg') {
this.helperService.showError('Only JPG/JPEG/PNG files allowed');
return;
}
const reader = new FileReader();
reader.readAsDataURL(event.target.files[0]); // read file as data url
reader.onload = (event) => {

this.playlistCoverImageObj = mainFile;

let formData: FormData = new FormData();

this.isLoading = true
formData.append('file', this.playlistCoverImageObj, this.playlistCoverImageObj.name);
this.subscriptions.push(
this.commonService.postAPICall({
url: 'upload-album-category-cover-image',
data: formData
}).subscribe((result)=>{
this.isLoading = false;
if(result.status == 200) {
this.playlistCoverImage = event.target.result;
this.playlistCoverImagePath = result.data.filePath;
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

  
submitCreatePlaylist(){
this.formSubmitted = true;

if(this.addForm.invalid) return;

let postData = {
name : this.addForm.get('name').value,
cover_picture : this.playlistCoverImagePath,
details : this.addForm.get('details').value,
}

this.subscriptions.push(
this.commonService.postAPICall({
url: 'album-category-add',
data: postData
}).subscribe((result)=>{
this.isLoading = false;
if(result.status == 200) {
this.helperService.showSuccess(result.msg);
this.router.navigate(['/playlist'])
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
 
