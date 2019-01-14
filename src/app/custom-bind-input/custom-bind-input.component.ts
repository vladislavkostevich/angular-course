import {Component} from '@angular/core';

@Component({
  selector: 'app-custom-bind-input',
  templateUrl: './custom-bind-input.component.html'
})
export class CustomBindInputComponent {

  inputValue = '';

  constructor() {
  }

  onInputEntered(event: Event) {
    this.inputValue = (<HTMLInputElement>event.target).value;
  }

}
