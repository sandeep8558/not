import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaceModel } from 'src/app/datamodel/PlaceModel';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
  standalone: false,
})
export class SharePage implements OnInit {

  public place$ = new BehaviorSubject<PlaceModel>({
    place_name: "",
    address: "",
    ssid: "",
    pswd: "",
    id: "",
    user_id: "",
    rooms: []
  });

  public rooms = [];

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
