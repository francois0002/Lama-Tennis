import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteLamaTennisComponent } from './promote-lama-tennis.component';

describe('PromoteLamaTennisComponent', () => {
  let component: PromoteLamaTennisComponent;
  let fixture: ComponentFixture<PromoteLamaTennisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoteLamaTennisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoteLamaTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
