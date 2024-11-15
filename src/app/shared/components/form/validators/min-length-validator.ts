import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minLength(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const arrayControl = control as FormArray;
        return arrayControl.length < length ? { minArrayLength: true} : null;
    }
}