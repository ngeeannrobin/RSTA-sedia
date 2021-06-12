import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRankNameComponent } from './change-rank-name.component';

describe('ChangeRankNameComponent', () => {
  let component: ChangeRankNameComponent;
  let fixture: ComponentFixture<ChangeRankNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRankNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRankNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
