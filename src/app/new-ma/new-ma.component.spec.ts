import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaComponent } from './new-ma.component';

describe('NewMaComponent', () => {
  let component: NewMaComponent;
  let fixture: ComponentFixture<NewMaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
