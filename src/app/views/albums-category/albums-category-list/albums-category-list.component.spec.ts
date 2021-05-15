import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsCategoryListComponent } from './albums-category-list.component';

describe('AlbumsCategoryListComponent', () => {
  let component: AlbumsCategoryListComponent;
  let fixture: ComponentFixture<AlbumsCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
