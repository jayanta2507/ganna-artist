import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsCategoryListComponent } from './songs-category-list.component';

describe('SongsCategoryListComponent', () => {
  let component: SongsCategoryListComponent;
  let fixture: ComponentFixture<SongsCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
