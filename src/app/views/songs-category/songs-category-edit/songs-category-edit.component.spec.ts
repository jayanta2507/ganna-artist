import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsCategoryEditComponent } from './songs-category-edit.component';

describe('SongsCategoryEditComponent', () => {
  let component: SongsCategoryEditComponent;
  let fixture: ComponentFixture<SongsCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
