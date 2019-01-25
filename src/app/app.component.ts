import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAr1tDvrnSeGyfsxrrI_4pZK9eykD6Cgfk',
      authDomain: 'angular-course-80668.firebaseapp.com'
    });
  }
}
