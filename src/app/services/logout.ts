import { Injectable } from '@angular/core';
import { Global } from './global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Logout {

    constructor(private router: Router){}

    public g = new Global();

    public logout(){
        this.g.isLogin.next(false);
        this.g.name.next("");
        localStorage.removeItem("notsystem");
        this.router.navigateByUrl("auth/login");
    }
  
}
