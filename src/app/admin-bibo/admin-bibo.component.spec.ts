import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBiboComponent } from './admin-bibo.component';

describe('AdminBiboComponent', () => {
  let component: AdminBiboComponent;
  let fixture: ComponentFixture<AdminBiboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBiboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBiboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
