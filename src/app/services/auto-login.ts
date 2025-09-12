import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Logout } from './logout';
import { Router } from '@angular/router';
import { UserModel } from './UserModel';
import { take } from 'rxjs';

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
    let req = this.http.get<UserModel>(path, {headers: headers});
    req.pipe(take(1)).subscribe(resp => {
      let auth = resp.authenticated ? '1' : '0';
      localStorage.setItem("auth", auth)
    }, error=>{
      let logout = new Logout(this.router)
      logout.logout();
      this.router.navigateByUrl("auth/login");
    });
  }
  
}
