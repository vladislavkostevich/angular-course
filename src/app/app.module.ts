import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AlertComponent} from './alert/alert.component';
import {DangerButtonComponent} from './danger-button/danger-button.component';
import { CustomBindInputComponent } from './custom-bind-input/custom-bind-input.component';
import { UsernameInputComponent } from './username-input/username-input.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    DangerButtonComponent,
    CustomBindInputComponent,
    UsernameInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
