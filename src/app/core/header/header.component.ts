import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {Observable} from 'rxjs';
import {State} from '../../auth/store/auth.reducers';
import {LogOut} from '../../auth/store/auth.actions';
import {FetchRecipes, StoreRecipes} from '../../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<State>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new LogOut());
  }
}
