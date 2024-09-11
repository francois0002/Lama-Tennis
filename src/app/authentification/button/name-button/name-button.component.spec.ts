import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameButtonComponent } from './name-button.component';

describe('NameButtonComponent', () => {
  let component: NameButtonComponent;
  let fixture: ComponentFixture<NameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
