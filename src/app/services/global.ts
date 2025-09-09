import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Global {

  public isLogin = new BehaviorSubject<boolean>(false);
  public name = new BehaviorSubject<string>("");
  
}
