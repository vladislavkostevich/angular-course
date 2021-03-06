import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {TrySingIn} from '../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSingIn(singInForm: NgForm) {
    const email = singInForm.value.email;
    const password = singInForm.value.password;
    this.store.dispatch(new TrySingIn({username: email, password: password}));
  }

}
