import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monAgence';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCWUXxhcGnEW4ckA1m4zjPokAMCnlV3i2g',
      authDomain: 'monagence-813ee.firebaseapp.com',
      databaseURL: 'https://monagence-813ee.firebaseio.com',
      projectId: 'monagence-813ee',
      storageBucket: 'monagence-813ee.appspot.com',
      messagingSenderId: '982307149532',
      appId: '1:982307149532:web:83f7cc02d86a60a3f7c619'
    };
    firebase.initializeApp(firebaseConfig);
  }

}
