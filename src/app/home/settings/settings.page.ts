import { Component, OnInit } from '@angular/core';
import { Logout } from 'src/app/services/logout';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  constructor(private logout: Logout) { }

  ngOnInit() {
  }

  logoutNow(){
    this.logout.logout();
  }

}
