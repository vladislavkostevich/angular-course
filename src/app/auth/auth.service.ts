import * as firebase from 'firebase';

export class AuthService {
  token: string;

  singUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
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
}
