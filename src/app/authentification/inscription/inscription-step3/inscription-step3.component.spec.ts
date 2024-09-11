import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionStep3Component } from './inscription-step3.component';

describe('InscriptionStep3Component', () => {
  let component: InscriptionStep3Component;
  let fixture: ComponentFixture<InscriptionStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionStep3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptionStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
