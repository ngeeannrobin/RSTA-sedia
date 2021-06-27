import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiboInputCodeComponent } from './bibo-input-code.component';

describe('BiboInputCodeComponent', () => {
  let component: BiboInputCodeComponent;
  let fixture: ComponentFixture<BiboInputCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiboInputCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiboInputCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
