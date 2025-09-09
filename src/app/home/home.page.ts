import { Component } from '@angular/core';
import { IonInput } from '@ionic/angular/standalone';
import { Global } from '../services/global';
import { Logout } from '../services/logout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  alertButtons = ['Action'];

  constructor(private router: Router) {}

  logout(){
    let logout = new Logout(this.router)
      logout.logout();
  }

}
