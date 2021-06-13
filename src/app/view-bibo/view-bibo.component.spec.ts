import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBiboComponent } from './view-bibo.component';

describe('ViewBiboComponent', () => {
  let component: ViewBiboComponent;
  let fixture: ComponentFixture<ViewBiboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBiboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBiboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
