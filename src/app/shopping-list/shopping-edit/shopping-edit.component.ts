import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient} from '../store/shopping-list.actions';
import {AppState} from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editingItem: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editingIngredientIndex > -1) {
            this.editingItem = data.editingIngredient;
            this.editMode = true;
            this.shoppingEditForm.setValue({
              name: this.editingItem.name,
              amount: this.editingItem.amount
            });
          } else {
            this.editMode = false;
          }
        }
      );
  }

  onSubmit() {
    const formValue = this.shoppingEditForm.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ingredient: newIngredient}));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }

    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopEdit());
    this.subscription.unsubscribe();
  }
}
