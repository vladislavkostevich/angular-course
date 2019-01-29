import {NgModule} from '@angular/core';
import {SingUpComponent} from './sing-up/sing-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [
    SingUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
