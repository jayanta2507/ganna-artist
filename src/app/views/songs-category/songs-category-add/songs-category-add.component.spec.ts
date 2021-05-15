import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsCategoryAddComponent } from './songs-category-add.component';

describe('SongsCategoryAddComponent', () => {
  let component: SongsCategoryAddComponent;
  let fixture: ComponentFixture<SongsCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsCategoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
