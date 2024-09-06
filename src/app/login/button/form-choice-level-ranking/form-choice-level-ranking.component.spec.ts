import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChoiceLevelRankingComponent } from './form-choice-level-ranking.component';

describe('FormChoiceLevelRankingComponent', () => {
  let component: FormChoiceLevelRankingComponent;
  let fixture: ComponentFixture<FormChoiceLevelRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormChoiceLevelRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormChoiceLevelRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
