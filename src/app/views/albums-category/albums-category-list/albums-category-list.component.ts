import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-albums-category-list',
  templateUrl: './albums-category-list.component.html',
  styleUrls: ['./albums-category-list.component.scss']
})
export class AlbumsCategoryListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
navigateToDetails(podcastCatId){
  	this.router.navigate(['podcast-category/details/'+btoa(podcastCatId)])
  }
  navigateToEdit(podcastCatEditId){
  	this.router.navigate(['podcast-category/edit/'+btoa(podcastCatEditId)])
  } 
}
 

  