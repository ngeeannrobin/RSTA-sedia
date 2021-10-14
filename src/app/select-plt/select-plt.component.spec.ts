import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPltComponent } from './select-plt.component';

describe('SelectPltComponent', () => {
  let component: SelectPltComponent;
  let fixture: ComponentFixture<SelectPltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
