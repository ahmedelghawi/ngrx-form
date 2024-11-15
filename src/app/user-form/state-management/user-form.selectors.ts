import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserFormState } from "../reducers";

export const selectUserFormState = createFeatureSelector<UserFormState>('userForm')

export const userDetailsSaved = createSelector(
    selectUserFormState,
    state => !!state.user
)