import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiboV2Component } from './bibo-v2.component';

describe('BiboV2Component', () => {
  let component: BiboV2Component;
  let fixture: ComponentFixture<BiboV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiboV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiboV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
