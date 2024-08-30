import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HautsFaitsComponent } from './hauts-faits.component';

describe('HautsFaitsComponent', () => {
  let component: HautsFaitsComponent;
  let fixture: ComponentFixture<HautsFaitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HautsFaitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HautsFaitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
