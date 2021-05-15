import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsCategoryAddComponent } from './albums-category-add.component';

describe('AlbumsCategoryAddComponent', () => {
  let component: AlbumsCategoryAddComponent;
  let fixture: ComponentFixture<AlbumsCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsCategoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
