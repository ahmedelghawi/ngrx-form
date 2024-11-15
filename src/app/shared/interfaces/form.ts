import { WritableSignal } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";

export interface IForm { 
    firstName: FormControl<string | null>,
    lastName: FormControl<string | null>,
    email: FormControl<string | null>,
    interests: FormArray<FormControl<string | null>>;
}

export interface UserForm {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    interests: string[] | null;
}

export interface ErrorMessages {
    [key: string]: WritableSignal<string>;
}