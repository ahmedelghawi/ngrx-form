import { createAction, props } from "@ngrx/store";
import { UserForm } from "../../shared/interfaces/form";


export const saveUserDetails = createAction(
    "[User Detail Save] User details saved",
    props<{user: UserForm}>()
);

export const undoUserDetails = createAction(
    "[User Detail reverted] User details reverted",
);

export const removeUserDetails = createAction(
    "[User Detail Removal] User detail removed"
);