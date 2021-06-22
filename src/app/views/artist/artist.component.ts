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
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  subscriptions: Subscription[] = [];
  isLoading: boolean = false;
  currentPage: any = 1;
  searchText: any = "";
  sortKey:any = "";
  sortType:any = "";
  totalArtistList: number = 0;
  searchStatus: number = 0;
  imageURL: any = environment.imageURL;
  artistList:any = [];

  constructor(private router:Router, private commonService: CommonService, private helperService: HelperService) {


   }

  ngOnInit(): void {

  	this.getArtistList();
  }

getArtistList(){

 if (this.searchStatus==0) {
        this.isLoading = true;
      }
      

      this.subscriptions.push(
        this.commonService.getAdminAPICall({
          url :'artist-list',
          data: { page: this.currentPage, search: this.searchText, sortKey: this.sortKey, sortType: this.sortType}
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {

            console.log(result)

            if(this.currentPage == 1) {
              this.artistList = [];
            }

            for(let item of result.data.artist_list.profile_image) {


              item.image_path = this.imageURL + item.profile_image;
              this.artistList.push(item);

            }
            
            this.totalArtistList = result.data;
            this.searchStatus = 0;
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



