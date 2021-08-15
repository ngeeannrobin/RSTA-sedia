import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureTrackingComponent } from './temperature-tracking.component';

describe('TemperatureTrackingComponent', () => {
  let component: TemperatureTrackingComponent;
  let fixture: ComponentFixture<TemperatureTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
