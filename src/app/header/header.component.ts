import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Ma Super Agence';

  isLogged = false;

  constructor(
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession){
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      }
    );
  }

  // Déconnexion de l'utilisateur via le composant AuthenticationService
  onSignOut = () => {
    this.authentication.signOutUser();
  }

}
