import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'name-button',
  templateUrl: 'name-button.component.html',
  styleUrl: 'name-button.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameButtonComponent {
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}

