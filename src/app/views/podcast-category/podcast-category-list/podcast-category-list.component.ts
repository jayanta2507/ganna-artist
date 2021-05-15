import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podcast-category-list',
  templateUrl: './podcast-category-list.component.html',
  styleUrls: ['./podcast-category-list.component.scss']
})


export class PodcastCategoryListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToDetails(podcastCatId){
  	this.router.navigate(['podcast-category/details/'+btoa(podcastCatId)])
  }

}
