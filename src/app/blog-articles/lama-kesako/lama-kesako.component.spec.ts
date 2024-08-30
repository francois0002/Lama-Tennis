import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LamaKesakoComponent } from './lama-kesako.component';

describe('LamaKesakoComponent', () => {
  let component: LamaKesakoComponent;
  let fixture: ComponentFixture<LamaKesakoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LamaKesakoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LamaKesakoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
