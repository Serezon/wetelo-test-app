import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookComponent } from './book/book.component';
import { TransferDataService } from './transfer-data.service';
import { AUTH_PROVIDERS } from './auth.service';
import { LoggedInGuard } from './logged-in.guard';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';


const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    canActivate: [ LoggedInGuard ],
    data: { title: 'Book List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'add',
    component: BookAddComponent,
    canActivate: [ LoggedInGuard ],
    data: { title: 'Book add form' }
  },
  {
    path: 'edit',
    component: BookEditComponent,
    canActivate: [ LoggedInGuard ],
    data: { title: 'Book List' }
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BookComponent,
    BookAddComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard,
    TransferDataService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
