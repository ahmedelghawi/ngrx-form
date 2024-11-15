import { Component, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, merge, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { userDetailsSaved } from '../../../user-form/state-management/user-form.selectors';
import { UserFormState } from '../../../user-form/reducers';
import { ErrorMessages, IForm, UserForm } from '../../interfaces/form';
import { minLength } from './validators/min-length-validator';
import { removeUserDetails, saveUserDetails, undoUserDetails } from '../../../user-form/state-management/user-form.actions';
import { ActionsService } from '../../../normal-form/services/actions.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() isNgRx!: boolean;
  userForm!: FormGroup<IForm>;
  userDetailsSaved$!: Observable<boolean>;
  userDetailsSaved!: boolean;
  canRevertChanges = false;

  requiredErrorMessage = 'You must enter a value';
  emailErrorMessage = 'Not a valid email';
  minLengthErrorMessage = 'Must have at least 3 interests.';

  errorMessages: ErrorMessages = {
    email: signal(''),
    firstName: signal(''),
    lastName: signal(''),
    interestArray: signal(''),
    interest: signal('')
  }

  constructor(private fb: FormBuilder, private store: Store<{userForm: UserFormState}>, private actionsService: ActionsService) {
    this.initializeForm();
    this.errorMessageChanges();
  }

  ngOnInit(): void {
    if (this.isNgRx) {
      this.updateUserDetailsSaved();
      this.previousChanges();
    }

    this.setUserForm();

  }

  updateUserDetailsSaved(): void {
    this.userDetailsSaved$ = this.store.pipe(
      select(userDetailsSaved)
    );
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl<string | null>(null, [Validators.required]),
      lastName: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      interests: this.fb.array<FormControl<string | null>>(
        [],
        {validators: minLength(3)}
      )
    });
  }

  errorMessageChanges(): void {
    merge(
      this.userForm.get('email')!.statusChanges.pipe(map(() => 'email')),
      this.userForm.get('firstName')!.statusChanges.pipe(map(() => 'firstName')),
      this.userForm.get('lastName')!.statusChanges.pipe(map(() => 'lastName')),
      this.userForm.get('interests')!.statusChanges.pipe(map(() => 'interests')),
      this.userForm.get('interests')!.valueChanges.pipe(map(() => 'interests'))
    )
      .pipe(takeUntilDestroyed())
      .subscribe((controlName: string) => this.updateErrorMessage(controlName));
  }

  setUserForm(): void {

    const localStorageKey = this.isNgRx ? 'user' : 'userNormal';
    if(localStorage.getItem(localStorageKey)) {
      const userData = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
      this.updateFormValues(userData);
    }
  }

  updateErrorMessage(controlName: string) {
    console.log(controlName);
    if (controlName !== 'interests') {
      this.updateErrorMessageForControl(controlName);
      this.updateErrorMessageForControl('firstName');
      this.updateErrorMessageForControl('lastName');
    } else {
      this.interests.controls.forEach((control, index) => {
        this.updateErrorMessageForInterestControl(control, index);
      }); 
    }
  }

  updateErrorMessageForControl(controlName: string) {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      this.errorMessages[controlName].set(this.requiredErrorMessage);
    } else if (control?.hasError('email')) {
      this.errorMessages[controlName].set(this.emailErrorMessage);
    }
  }

  updateErrorMessageForInterestControl(control: AbstractControl<any, any>, index: number) {
    if (control.hasError('required')) {
      this.errorMessages['interest'].set(this.requiredErrorMessage);
    } else if (this.interests.hasError('minArrayLength')) {
      this.errorMessages['interestArray'].set(this.minLengthErrorMessage);
    }
  }

  previousChanges(): void {
    this.store.select('userForm').subscribe((state) => {
      if(this.canRevertChanges) {
        this.canRevertChanges = false;
        state.previousStates ? this.updateFormValues(state.previousStates) : this.clearCache();
      }
    });
  }

  updateFormValues(data: UserForm): void {
    this.userForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    });
    this.interests.clear();
    if (data.interests) {
      data.interests.forEach((interest: string) => {
        this.addInterest(interest);
      })
    }
    this.updateUserDetails();
  }

  interestControl(value: string): FormControl<string | null> {
    return this.fb.control(value, [Validators.required]);
  }

  get interests(): FormArray {
    return this.userForm.get('interests') as FormArray;
  }

  addInterest(interest: string): void {
    this.interests.push(this.interestControl(interest))
  }

  removeInterest(index: number): void {
    this.interests.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.updateUserDetails();
    }
  }

  updateUserDetails(): void {
    const valueToSave = this.userForm.value as UserForm;
    if (this.isNgRx) {
      this.store.dispatch(saveUserDetails({user: valueToSave}));
    } else {
      this.userDetailsSaved = true;
      this.actionsService.saveForm(valueToSave);
    }
  }

  clearCache(): void {
    if (this.isNgRx) {
      this.store.dispatch(removeUserDetails());
    } else {
      this.actionsService.deleteForm();
      this.userDetailsSaved = false;
    }
    this.userForm.reset({
      firstName: '',
      lastName: '',
      email: '',
    });
    this.interests.clear();
  }

  revertChanges(): void {
    this.canRevertChanges = true;
    this.store.dispatch(undoUserDetails());
  }

}
