import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'course-project';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyD0QtmvB6uqKBCsfCl54XV26EMqCHaNDHY',
      authDomain: 'angular-recipes-udemy.firebaseapp.com',
      databaseURL: 'https://angular-recipes-udemy.firebaseio.com',
      projectId: 'angular-recipes-udemy',
      storageBucket: 'angular-recipes-udemy.appspot.com',
      messagingSenderId: '402750972912'
    });
  }
}
