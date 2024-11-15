import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RegisterForm {
  phoneNumber: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  level: string;
  ranking: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formSubject = new BehaviorSubject<RegisterForm>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    level: '',
    ranking: '',
  });

  form$ = this.formSubject.asObservable();

  updateForm(partialForm: Partial<RegisterForm>) {
    const currentForm = this.formSubject.value;
    this.formSubject.next({ ...currentForm, ...partialForm });
  }

  getFormData(): RegisterForm {
    return this.formSubject.value;
  }
}
