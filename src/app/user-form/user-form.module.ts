import { NgModule } from "@angular/core";
import { UserFormComponent } from "./user-form.component";
import { SharedModule } from "../shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { FormComponent } from "../shared/components/form/form.component";

@NgModule({
    declarations: [UserFormComponent],
    imports: [
        SharedModule,
        MatCardModule
    ],
    exports: [UserFormComponent]
})

export class UserFormModule {}