import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsCategoryDetailsComponent } from './songs-category-details.component';

describe('SongsCategoryDetailsComponent', () => {
  let component: SongsCategoryDetailsComponent;
  let fixture: ComponentFixture<SongsCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
