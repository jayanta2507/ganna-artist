import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStatusChangeComponent } from './country-status-change.component';

describe('CountryStatusChangeComponent', () => {
  let component: CountryStatusChangeComponent;
  let fixture: ComponentFixture<CountryStatusChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryStatusChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStatusChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
