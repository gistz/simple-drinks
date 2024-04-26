import { Routes } from '@angular/router';
import { DrinksDetailComponent } from './drinks/components/drinks-detail.component';
import { AppComponent } from './app.component';
import { DrinksPageComponent } from './drinks/components/drinks-page.component';

export const routes: Routes = [
    {
        path:"",
        component:DrinksPageComponent
    },
    {
        path: "drink/:id",
        component: DrinksDetailComponent
    },
];
