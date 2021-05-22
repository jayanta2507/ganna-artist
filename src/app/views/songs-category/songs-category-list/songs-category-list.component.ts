import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs-category-list',
  templateUrl: './songs-category-list.component.html',
  styleUrls: ['./songs-category-list.component.scss']
})
export class SongsCategoryListComponent implements OnInit {


  constructor(private router:Router) { }

  ngOnInit(): void {
    //this.getGategoryList();
  }
  navigateToDetails(songCatId){
  		this.router.navigate(['songs-category/details/'+btoa(songCatId)])

  }
  navigateToEdit(songCatEditId){
         this.router.navigate(['songs-category/edit/'+btoa(songCatEditId)])
  }

}
