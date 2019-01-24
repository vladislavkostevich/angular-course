import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editingItemIndex: number;
  editingItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editingItemIndex = index;
        this.editingItem = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        });
      });
  }

  onSubmit() {
    const formValue = this.shoppingEditForm.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editingItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
