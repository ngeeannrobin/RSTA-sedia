import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadeStateComponent } from './parade-state.component';

describe('ParadeStateComponent', () => {
  let component: ParadeStateComponent;
  let fixture: ComponentFixture<ParadeStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParadeStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParadeStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
