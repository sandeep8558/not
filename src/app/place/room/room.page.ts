import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, take } from 'rxjs';
import { PlaceModel } from 'src/app/datamodel/PlaceModel';
import { RoomModel } from 'src/app/datamodel/RoomModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
  standalone: false,
})
export class RoomPage implements OnInit {

  public isRoomFormOpen = false;
  public rooms: RoomModel[] = [];

  public roomForm = new FormGroup({
    room_name: new FormControl("", [Validators.required]),
    id: new FormControl(""),
    place_id: new FormControl(""),
  });

  public place$ = new BehaviorSubject<PlaceModel>({
    place_name: "",
    address: "",
    ssid: "",
    pswd: "",
    id: "",
    user_id: ""
  });

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadPlace();
    this.getRooms();
  }

  getRooms(){
    let path = environment.host + "/api/rooms";
    this.place$.pipe(take(1)).subscribe(place => {
      this.http.get<RoomModel[]>(path, {
        params:{place_id : place.id}
      }).pipe(take(1)).subscribe(rooms => {
        this.rooms = rooms;
      });
    });
  }

  loadPlace(){
    let placeString = localStorage.getItem("place");
    if(placeString){
      let place =  JSON.parse(placeString);
      this.place$.next(place);
    }
  }

  openForm(){
    this.place$.subscribe(place => {
      this.roomForm.get("place_id")?.setValue(place.id);
    });
    this.isRoomFormOpen = true;
  }

  closeForm(){
    this.roomForm.reset();
    this.isRoomFormOpen = false;
  }

  changeRoomName(room: RoomModel, event: any){
    let path = environment.host + "/api/rooms/update";
    let formData = {
      id: room.id,
      room_name: event.target.value
    };
    this.http.post(path, formData).pipe(take(1)).subscribe(res => {
      this.getRooms();
    });
  }

  saveRoom(){
    if(this.roomForm.value["id"]){
    } else {
      this.addRoom();
    }
  }

  addRoom(){
    let path = environment.host + "/api/rooms/add";
    let formData = this.roomForm.value;
    this.http.post(path, formData).pipe(take(1)).subscribe(res => {
      this.closeForm();
      this.getRooms();
    });
  }

  async deleteRoomAlert(id: string){
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this room?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteRoom(id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteRoom(id: string){
    let path = environment.host + "/api/rooms/delete";
    this.http.delete(path, {params: {id:id}}).pipe(take(1)).subscribe(res => {
      this.getRooms();
    });
  }

}
