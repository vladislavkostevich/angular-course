import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSingUp(signUpForm: NgForm) {
    const email = signUpForm.value.email;
    const password = signUpForm.value.password;
    this.authService.singUpUser(email, password);
  }

}
