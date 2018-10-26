import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestShelterComponent } from './request-shelter.component';

describe('RequestShelterComponent', () => {
  let component: RequestShelterComponent;
  let fixture: ComponentFixture<RequestShelterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestShelterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
