import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWithLamaComponent } from './start-with-lama.component';

describe('StartWithLamaComponent', () => {
  let component: StartWithLamaComponent;
  let fixture: ComponentFixture<StartWithLamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartWithLamaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartWithLamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
