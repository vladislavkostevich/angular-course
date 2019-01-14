import {Component} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  alertType = 'success';

  getAlertClassesObject() {
    return {
      'alert-success': this.alertType === 'success',
      'alert-danger': this.alertType === 'danger'
    };
  }

  getAlertContent() {
    return this.alertType === 'success' ? 'Success Message' : 'Danger Message';
  }

  getButtonClassesObject() {
    return {
      'btn-danger': this.alertType === 'success',
      'btn-success': this.alertType === 'danger'
    };
  }

  getButtonContent() {
    return this.alertType === 'success' ? 'Make It Danger' : 'Make It Success';
  }

  onButtonClick() {
    if ('success' === this.alertType) {
      this.alertType = 'danger';
    } else {
      this.alertType = 'success';
    }
  }

}
