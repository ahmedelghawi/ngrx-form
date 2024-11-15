import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserFormActions } from "./action-types";
import { tap } from "rxjs";

@Injectable()
export class UserFormEffects {
    
    constructor(private actions$: Actions) {}

    saveUserDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserFormActions.saveUserDetails),
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.user));
            })
        ),
        {dispatch: false}
    );
    undoUserChanges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserFormActions.undoUserDetails),
            tap()
        ),
        {dispatch: false}
    );
    removeUserDetails$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserFormActions.removeUserDetails),
            tap(action => {
                localStorage.removeItem('user');
            })
        ),
        {dispatch: false}
    );

}
