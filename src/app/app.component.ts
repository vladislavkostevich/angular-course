import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alerts = [1, 2, 3];

  onAddAlert() {
    this.alerts.push(this.alerts.length + 1);
  }
}
