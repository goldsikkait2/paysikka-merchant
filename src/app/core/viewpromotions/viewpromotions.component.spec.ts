import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpromotionsComponent } from './viewpromotions.component';

describe('ViewpromotionsComponent', () => {
  let component: ViewpromotionsComponent;
  let fixture: ComponentFixture<ViewpromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
