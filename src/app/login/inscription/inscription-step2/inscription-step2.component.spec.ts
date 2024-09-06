import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionStep2Component } from './inscription-step2.component';

describe('InscriptionStep2Component', () => {
  let component: InscriptionStep2Component;
  let fixture: ComponentFixture<InscriptionStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionStep2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptionStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
