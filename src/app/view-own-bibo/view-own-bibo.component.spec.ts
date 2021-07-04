import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnBiboComponent } from './view-own-bibo.component';

describe('ViewOwnBiboComponent', () => {
  let component: ViewOwnBiboComponent;
  let fixture: ComponentFixture<ViewOwnBiboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnBiboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnBiboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
