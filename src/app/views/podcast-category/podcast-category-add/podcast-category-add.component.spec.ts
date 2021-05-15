import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastCategoryAddComponent } from './podcast-category-add.component';

describe('PodcastCategoryAddComponent', () => {
  let component: PodcastCategoryAddComponent;
  let fixture: ComponentFixture<PodcastCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastCategoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
