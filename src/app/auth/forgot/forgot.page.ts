import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
  standalone: false,
})
export class ForgotPage implements OnInit {

  public otpState = false;
  public message = null;
  public success = null;

  forgotForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  passwordResetForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    otp: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    password: new FormControl("", [Validators.required]),
    password_confirmation: new FormControl("", [Validators.required]),
  });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  forgot(){
    if(this.otpState){
      /* Resetting Password Form */
      if(this.passwordResetForm){
        let path = environment.host + "/api/forgot"
        let resp = this.http.post<any>(path,this.passwordResetForm.value);
        resp.subscribe(data => {
          this.message = data.message;
          this.success = data.success;
          if(data.success){
            setTimeout(() => {
              this.router.navigateByUrl("/auth/login");
            }, 5000);
          }
          console.log(data);
        });
      }
    } else {
      /* OTP Sending Form */
      if(this.forgotForm.valid){
        let path = environment.host + "/api/setotp"
        let resp = this.http.post<any>(path,this.forgotForm.value);
        resp.subscribe(data => {
          this.message = data.message;
          this.success = data.success;
          if(data.success){
            this.passwordResetForm.patchValue({
              email: this.forgotForm.value.email
            });
            this.otpState = true;
          }
          console.log(data);
        });
      }
    }
  }

}
