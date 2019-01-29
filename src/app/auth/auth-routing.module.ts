import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SingUpComponent} from './sing-up/sing-up.component';
import {SignInComponent} from './sign-in/sign-in.component';

const authRoutes: Routes = [
  {path: 'sign-up', component: SingUpComponent},
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
