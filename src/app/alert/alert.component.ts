import {Component} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  type = 'success';
  message = 'Indicates a successful or positive action.';
  visible = false;

  constructor() {
    setTimeout(() => {
      this.visible = true;
    }, 3000);
  }
}
