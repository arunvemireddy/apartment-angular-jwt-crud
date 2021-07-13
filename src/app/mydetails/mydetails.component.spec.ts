import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydetailsComponent } from './mydetails.component';

describe('MydetailsComponent', () => {
  let component: MydetailsComponent;
  let fixture: ComponentFixture<MydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
