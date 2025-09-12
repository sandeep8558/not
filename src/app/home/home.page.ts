import { Component } from '@angular/core';
import { IonInput } from '@ionic/angular/standalone';
import { Logout } from '../services/logout';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  alertButtons = ['Action'];
  title="";

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(){
  }

  logout(){
    let logout = new Logout(this.router)
      logout.logout();
  }

}
