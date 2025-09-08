import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
  standalone: false,
})
export class ForgotPage implements OnInit {

  forgotForm = new FormGroup({
    email: new FormControl("sandeep198558@yahoo.com", [Validators.required, Validators.email]),
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  forgot(){
    if(this.forgotForm.valid){
      let path = environment.host + "/api/forgot"
      let resp = this.http.post<any>(path,this.forgotForm.value);
      resp.subscribe(data => {
        console.log(data);
      });
    }
  }

}
