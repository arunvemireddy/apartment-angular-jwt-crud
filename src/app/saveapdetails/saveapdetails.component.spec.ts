import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveapdetailsComponent } from './saveapdetails.component';

describe('SaveapdetailsComponent', () => {
  let component: SaveapdetailsComponent;
  let fixture: ComponentFixture<SaveapdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveapdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveapdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
