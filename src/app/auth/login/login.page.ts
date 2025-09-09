import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  public message = null;
  public errors = {
    email: null,
    password: null
  };

  public success = null;
  public user = null;
  public token = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(){
    if(this.loginForm.valid){
          let path = environment.host + "/api/login"
          let resp = this.http.post<any>(path,this.loginForm.value);
          resp.subscribe(data => {
            this.message = data.message;
            this.success = data.success;

            if(data.errors != null){
              this.errors.email = data.errors.hasOwnProperty("email") ? data.errors["email"][0] : null;
              this.errors.password = data.errors.hasOwnProperty("password") ? data.errors["password"][0] : null;
            }
    
    
            if(data.success){
              this.user = data.user;
              this.token = data.token;
              localStorage.setItem('notsystem', data.token)
            }
            
            console.log(data);
          });
        }
  }

}
