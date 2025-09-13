import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaceModel } from 'src/app/datamodel/PlaceModel';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
  standalone: false,
})
export class TimerPage implements OnInit {

  public place$ = new BehaviorSubject<PlaceModel>({
    place_name: "",
    address: "",
    ssid: "",
    pswd: "",
    id: "",
    user_id: "",
    rooms: [],
  });

  constructor() { }

  ngOnInit() {
    this.loadPlace();
  }

  loadPlace(){
    let placeString = localStorage.getItem("place");
    if(placeString){
      let place =  JSON.parse(placeString);
      this.place$.next(place);
    }
  }

  openForm(){}

}
