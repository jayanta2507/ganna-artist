import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastCategoryListComponent } from './podcast-category-list.component';

describe('PodcastCategoryListComponent', () => {
  let component: PodcastCategoryListComponent;
  let fixture: ComponentFixture<PodcastCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
