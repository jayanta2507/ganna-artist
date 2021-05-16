import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsCategoryEditComponent } from './albums-category-edit.component';

describe('AlbumsCategoryEditComponent', () => {
  let component: AlbumsCategoryEditComponent;
  let fixture: ComponentFixture<AlbumsCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
