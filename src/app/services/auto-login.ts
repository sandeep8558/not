import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AutoLoginResponse } from './AutoLoginResponse';
import { Global } from './global';
import { Logout } from './logout';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AutoLogin {

  constructor(private http: HttpClient, private router: Router){}

  public login(){
    let token = localStorage.getItem("notsystem");
    let path = environment.host + "/api/user";
    let headers = {
      Authorization: "Bearer " + token,
    };
    let req = this.http.get<AutoLoginResponse>(path, {headers: headers});
    req.subscribe(resp => {
      let global = new Global();
      global.isLogin.next(resp.success);
      global.name.next(resp.name);
      this.router.navigateByUrl("home");
      console.log(resp);
    }, error=>{
      let logout = new Logout(this.router)
      logout.logout();
      console.log(error);
      this.router.navigateByUrl("auth/login");
    });
  }
  
}
