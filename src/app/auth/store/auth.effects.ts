import {Effect, Actions, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {map, tap, mergeMap, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {from} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGN_UP),
      map((action: AuthActions.TrySingUp) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        return [
          {
            type: AuthActions.SING_UP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }));

  @Effect()
  authSignIn = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SING_IN),
      map((action: AuthActions.TrySingUp) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SING_IN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }));

  @Effect({dispatch: false})
  authLogOut = this.actions$
    .pipe(
      ofType(AuthActions.LOG_OUT),
      tap(() => {
        this.router.navigate(['/']);
      }));

  constructor(private actions$: Actions, private router: Router) {
  }
}
