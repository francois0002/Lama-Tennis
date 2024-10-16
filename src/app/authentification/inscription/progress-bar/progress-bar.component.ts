import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnChanges {
  @Input() currentStep: number = 1;
  steps: number[] = [1, 2, 3];
  progress: number = 0;

  ngOnChanges() {
    this.progress = (this.currentStep / this.steps.length) * 100;
  }
}
