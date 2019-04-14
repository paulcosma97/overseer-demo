import { Routes } from '@angular/router';
import { ProductSearchComponent } from '../core/product-search/product-search.component';
import { ProfileComponent } from '../core/profile/profile.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
    { path: '', component: ProductSearchComponent },
    { path: 'search/:terms/:excludedTerms', component: ProductSearchComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthenticatedGuard ] },
];
