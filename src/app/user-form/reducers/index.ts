import { Action, createReducer, on } from "@ngrx/store";
import { UserForm } from "../../shared/interfaces/form";
import { UserFormActions } from "../state-management/action-types";

export interface UserFormState {
    user: UserForm | null,
    previousStates: UserForm | null;
}

export const initialUserFormState: UserFormState = {
    user: null,
    previousStates: null
}

const _userFormReducer = createReducer(
    initialUserFormState,
    on(UserFormActions.saveUserDetails, (state, action) => {
        return {
            user: action.user,
            previousStates: state.user
        }
    }),
    on(UserFormActions.undoUserDetails, (state, action) => { 
        return {
            ...state,
            user: state.previousStates
        }
    }),
    on(UserFormActions.removeUserDetails, (state, action) => {
        return {
            ...state,
            user: null
        }
    })
)

export function userFormReducer(state: UserFormState | undefined, action: Action) {
    return _userFormReducer(state, action);
}