import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiboComponent } from './bibo.component';

describe('BiboComponent', () => {
  let component: BiboComponent;
  let fixture: ComponentFixture<BiboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
