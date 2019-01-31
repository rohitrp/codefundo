import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterInfoComponent } from './shelter-info.component';

describe('ShelterInfoComponent', () => {
  let component: ShelterInfoComponent;
  let fixture: ComponentFixture<ShelterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
