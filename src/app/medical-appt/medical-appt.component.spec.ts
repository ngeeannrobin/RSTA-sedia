import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalApptComponent } from './medical-appt.component';

describe('MedicalApptComponent', () => {
  let component: MedicalApptComponent;
  let fixture: ComponentFixture<MedicalApptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalApptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
