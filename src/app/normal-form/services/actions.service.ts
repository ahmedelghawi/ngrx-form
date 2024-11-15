import { Injectable } from "@angular/core";
import { UserForm } from "../../shared/interfaces/form";

@Injectable({
    providedIn: 'root'
})
export class ActionsService {
    saveForm(userData: UserForm): void {
        localStorage.setItem('userNormal', JSON.stringify(userData));
    }

    deleteForm(): void {
      localStorage.removeItem('userNormal');
    }
}
