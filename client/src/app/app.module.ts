import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './core/app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductsTableComponent } from './core/products-table/products-table.component';
import AuthInterceptor from './shared/services/auth.interceptor';
import { LoginComponent } from './shared/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './shared/state/effects';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './core/product-search/product-search.component';
import { routes } from './shared/routes';
import { ProfileComponent } from './core/profile/profile.component';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { RegisterComponent } from './shared/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsTableComponent,
    LoginComponent,
    ProductSearchComponent,
    ProfileComponent,
    ErrorModalComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
