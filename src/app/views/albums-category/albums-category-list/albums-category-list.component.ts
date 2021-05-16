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
 navigateToDetails(albumsCatId){
  	this.router.navigate(['albums-category/details/'+btoa(albumsCatId)])
  }
  navigateToEdit(albumsCatEditId){
  	this.router.navigate(['albums-category/edit/'+btoa(albumsCatEditId)])
  } 
}
 

  