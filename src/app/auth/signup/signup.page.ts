import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl("Sandeep Rathod", Validators.required),
    email: new FormControl("sandeep198558@yahoo.com", [Validators.required, Validators.email]),
    password: new FormControl("123456789", [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl("1234567890", [Validators.required, Validators.minLength(8)]),
  });

  public message = null;
  public errors = {
    name: null,
    email: null,
    password: null
  };
  public success = null;
  public user = null;
  public token = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  signup(){
    if(this.signupForm.valid){
      let path = environment.host + "/api/signup"
      let resp = this.http.post<any>(path,this.signupForm.value);
      resp.subscribe(data => {
        this.message = data.message;
        this.success = data.success;
        this.errors = data.errors;

        if(data.errors.hasOwnProperty("email")){
          this.errors.email = data.errors["email"][0];
        }

        if(data.errors.hasOwnProperty("name")){
          this.errors.name = data.errors["name"][0];
        }

        if(data.errors.hasOwnProperty("password")){
          this.errors.password = data.errors["password"][0];
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
