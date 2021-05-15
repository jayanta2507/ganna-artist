import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastCategoryDetailsComponent } from './podcast-category-details.component';

describe('PodcastCategoryDetailsComponent', () => {
  let component: PodcastCategoryDetailsComponent;
  let fixture: ComponentFixture<PodcastCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
