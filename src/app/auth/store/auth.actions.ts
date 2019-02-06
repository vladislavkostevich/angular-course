import {Action} from '@ngrx/store';

export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const SING_UP = 'SING_UP';
export const TRY_SING_IN = 'TRY_SING_IN';
export const SING_IN = 'SING_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySingUp implements Action {
  readonly type = TRY_SIGN_UP;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class SingUp implements Action {
  readonly type = SING_UP;
}

export class TrySingIn implements Action {
  readonly type = TRY_SING_IN;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class SingIn implements Action {
  readonly type = SING_IN;
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {
  }
}

export type AuthActions =
  TrySingUp |
  SingUp |
  TrySingIn |
  SingIn |
  LogOut |
  SetToken;


