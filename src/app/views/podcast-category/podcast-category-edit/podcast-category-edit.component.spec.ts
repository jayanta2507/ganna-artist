import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastCategoryEditComponent } from './podcast-category-edit.component';

describe('PodcastCategoryEditComponent', () => {
  let component: PodcastCategoryEditComponent;
  let fixture: ComponentFixture<PodcastCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
