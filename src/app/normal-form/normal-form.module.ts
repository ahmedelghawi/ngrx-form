import { NgModule } from "@angular/core";
import { NormalFormComponent } from "./normal-form.component";
import { SharedModule } from "../shared/shared.module";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    declarations: [NormalFormComponent],
    imports: [
        SharedModule,
        MatCardModule
    ],
    exports: [NormalFormComponent]
})

export class NormalFormModule {}