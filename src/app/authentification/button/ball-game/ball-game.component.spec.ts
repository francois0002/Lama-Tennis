import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallGameComponent } from './ball-game.component';

describe('BallGameComponent', () => {
  let component: BallGameComponent;
  let fixture: ComponentFixture<BallGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
