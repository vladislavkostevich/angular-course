import {Component} from '@angular/core';

@Component({
  selector: 'app-danger-button',
  templateUrl: './danger-button.component.html'
})
export class DangerButtonComponent {
  type = 'danger';

  onMakeSuccess() {
    this.type = 'success';
  }
}
