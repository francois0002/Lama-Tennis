import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChoiceLevelComponent } from './form-choice-level.component';

describe('FormChoiceLevelComponent', () => {
  let component: FormChoiceLevelComponent;
  let fixture: ComponentFixture<FormChoiceLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormChoiceLevelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormChoiceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
