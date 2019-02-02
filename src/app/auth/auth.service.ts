import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  singUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(token => this.token = token);
        }
      )
      .catch(error => console.error(error));
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(token => this.token = token);
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logOut() {
    firebase.auth().signOut();
    this.token = null;
  }
}
