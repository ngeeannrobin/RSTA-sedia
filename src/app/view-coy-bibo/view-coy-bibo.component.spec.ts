import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoyBiboComponent } from './view-coy-bibo.component';

describe('ViewCoyBiboComponent', () => {
  let component: ViewCoyBiboComponent;
  let fixture: ComponentFixture<ViewCoyBiboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoyBiboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoyBiboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
