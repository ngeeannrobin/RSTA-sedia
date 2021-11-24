import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ELanyardComponent } from './e-lanyard.component';

describe('ELanyardComponent', () => {
  let component: ELanyardComponent;
  let fixture: ComponentFixture<ELanyardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ELanyardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ELanyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
