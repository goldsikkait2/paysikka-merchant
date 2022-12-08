import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstpagepromotionComponent } from './firstpagepromotion.component';

describe('FirstpagepromotionComponent', () => {
  let component: FirstpagepromotionComponent;
  let fixture: ComponentFixture<FirstpagepromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstpagepromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstpagepromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
