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
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  signup(){
    if(this.signupForm.valid){
      let path = environment.host + "/api/signup"
      let resp = this.http.post<any>(path,this.signupForm.value);
      resp.subscribe(data => {
        console.log(data);
      });
    }
  }

}
