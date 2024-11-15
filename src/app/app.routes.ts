import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { NormalFormComponent } from './normal-form/normal-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ngrx-form',
        pathMatch: 'full'
    },
    {
        path: 'ngrx-form',
        component: UserFormComponent
    },
    {
        path: 'normal-form',
        component: NormalFormComponent
    },
    {
        path: '**',
        redirectTo: 'ngrx-form',
        pathMatch: 'full'
    }
];
