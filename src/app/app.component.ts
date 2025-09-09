import { Component } from '@angular/core';
import { AutoLogin } from './services/auto-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(private http: HttpClient, private router: Router) {
    let auto  = new AutoLogin(this.http, this.router);
    auto.login();
  }

  ngOnInit(){
    
  }
}
