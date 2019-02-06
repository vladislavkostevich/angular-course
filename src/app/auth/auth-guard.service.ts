import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import {State} from './store/auth.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {

    return this.store.select('auth')
      .pipe(
        take(1),
        map((authState: State) => {
          return authState.authenticated;
        })
      );
  }

}
