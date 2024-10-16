import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandartButtonComponent } from './standart-button.component';

describe('StandartButtonComponent', () => {
  let component: StandartButtonComponent;
  let fixture: ComponentFixture<StandartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandartButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
