import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsCategoryDetailsComponent } from './albums-category-details.component';

describe('AlbumsCategoryDetailsComponent', () => {
  let component: AlbumsCategoryDetailsComponent;
  let fixture: ComponentFixture<AlbumsCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
