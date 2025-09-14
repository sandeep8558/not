import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaceModel } from '../datamodel/PlaceModel';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
  standalone: false,
})
export class PlacePage implements OnInit {

  tabToShow: number = 0;

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

  setCurrentTab() {
    this.tabToShow = this.tabToShow;
  }

}
