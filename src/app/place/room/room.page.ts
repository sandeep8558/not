import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, take } from 'rxjs';
import { ApplianceModel } from 'src/app/datamodel/ApplianceModel';
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
  public config: boolean = false;

  public roomForm = new FormGroup({
    room_name: new FormControl("", [Validators.required]),
    id: new FormControl(""),
    place_id: new FormControl(""),
  });

  public applianceForm = new FormGroup({
    appliance_name: new FormControl("", [Validators.required]),
    appliance_type: new FormControl("", [Validators.required]),
    id: new FormControl(""),
  });

  public place$ = new BehaviorSubject<PlaceModel>({
    place_name: "",
    address: "",
    ssid: "",
    pswd: "",
    id: "",
    user_id: "",
    rooms: [],
    share_places: [],
  });

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
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

  configure(){
    this.config = !this.config;
  }

  saveAppliance(room_id:string, place_id:string){

    console.log(this.applianceForm.value["id"] != "");

    if(this.applianceForm.value["id"]){
      this.updateAppliances();
    } else {
      let formData:any = this.applianceForm.value;
      formData.place_id = place_id;
      formData.room_id = room_id;
      this.addAppliance(formData);
    }

  }

  editAppliance(app: ApplianceModel){
    this.applianceForm.get("appliance_name")?.setValue(app.appliance_name);
    this.applianceForm.get("appliance_type")?.setValue(app.appliance_type);
    this.applianceForm.get("id")?.setValue(app.id);
  }

  addAppliance(formData: any){
    let path = environment.host + "/api/appliances/add";
    this.http.post(path, formData).pipe(take(1)).subscribe(data => {
      this.applianceForm.reset();
      this.getRooms();
    });
  }

  updateAppliances(){
    let path = environment.host + "/api/appliances/update";
    this.http.post(path, this.applianceForm.value).pipe(take(1)).subscribe(data => {
      console.log(data);
      this.applianceForm.reset();
      this.getRooms();
    });
  }

  async presentApplianceDeleteAlert(app: ApplianceModel){
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this appliance?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteAppliance(app);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteAppliance(app: ApplianceModel){
    let path = environment.host + "/api/appliances/delete";
    this.http.delete(path, {params: {id:app.id}}).pipe(take(1)).subscribe(res => {
      this.getRooms();
    });
  }

}
