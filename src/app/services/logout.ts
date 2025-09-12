import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class Logout {

    constructor(private router: Router){}

    public logout(){
        localStorage.removeItem("notsystem");
        localStorage.removeItem("auth");
        this.router.navigateByUrl("auth/login");
    }
  
}
