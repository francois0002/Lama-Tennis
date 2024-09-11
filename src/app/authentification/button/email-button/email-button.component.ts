import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

/** @title Form field with error messages */
@Component({
  selector: 'email-button',
  templateUrl: 'email-button.component.html',
  styleUrl: 'email-button.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailButtonComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Entres ton email');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('e-mail invalide');
    } else {
      this.errorMessage.set('');
    }
  }
}
