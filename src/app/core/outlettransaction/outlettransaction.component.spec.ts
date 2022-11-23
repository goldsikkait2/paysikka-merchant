import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlettransactionComponent } from './outlettransaction.component';

describe('OutlettransactionComponent', () => {
  let component: OutlettransactionComponent;
  let fixture: ComponentFixture<OutlettransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlettransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutlettransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
