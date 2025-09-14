import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, take } from 'rxjs';
import { PlaceModel } from 'src/app/datamodel/PlaceModel';
import { environment } from 'src/environments/environment';

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
    rooms: [],
    share_places: [],
  });

  public email = "isaac@gmail.com";
  public appliances: string[] = [];
  public isFormOpen = false;
  public formMessage = "";
  public success = false;

  public shared:any = [];

  constructor(private http: HttpClient, private alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadPlace();
  }

  loadPlace(){
    let placeString = localStorage.getItem("place");
    if(placeString){
      let place =  JSON.parse(placeString);
      this.place$.next(place);
      this.loadSharedPlaces();
    }
  }

  loadSharedPlaces(){
    this.place$.subscribe(place => {
      this.shared = place.share_places;
    });
  }

  updateShare(user_id:any, place_id:any, share_place_id: any, room_id:any, appliance_id:any, event:any){
    let formData = {
      user_id: user_id,
      place_id: place_id,
      share_place_id: share_place_id,
      room_id: room_id,
      appliance_id: appliance_id,
      action: event.target.checked ? 'Add' : 'Delete',
    };
    let path = environment.host + "/api/share/update";
    this.http.post<any>(path, formData).pipe(take(1)).subscribe(data => {
      console.log(data);
      localStorage.setItem("place", JSON.stringify(data.data));
        this.loadPlace();
    });
  }

  openForm(){
    this.isFormOpen = true;
  }

  closeForm(){
    this.isFormOpen = false;
  }

  sharePlace(){
    if(this.email != "" && this.email != null){

      let rooms:any = [];
      let place_id = "";
      this.place$.subscribe(place=> {
        place_id = place.id;
        place.rooms.forEach(room => {
          let isAppliance = false;
          room.appliances.forEach(appliance => {
            if(this.appliances.includes(appliance.id)){
              isAppliance = this.appliances.includes(appliance.id);
            }
          });
          if(isAppliance){
            rooms.push(room.id);
          }
        });
        
      });
      
      let formData = {
        email: this.email,
        appliances: this.appliances,
        rooms: rooms,
        place_id: place_id
      };

      let path = environment.host + "/api/share/add";
      this.http.post<any>(path, formData).pipe(take(1)).subscribe(res => {
        this.formMessage = res.message;
        this.success = res.success;
        if(this.success){
          this.email = "";
          this.appliances = [];
          this.isFormOpen = false;
          localStorage.setItem("place", JSON.stringify(res.data));
          this.loadPlace();
        }

        setTimeout(() => {
          this.formMessage = "";
          this.success = false;
        }, 3000);

      });

    }
    
  }

  async presentRevoke(sharePlace:any){
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to revoke access?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.revokeAccess(sharePlace);
          }
        }
      ]
    });
    await alert.present();
  }

  revokeAccess(sharePlace:any){
    let path = environment.host + "/api/share/delete";
    this.http.delete<any>(path, {params: {id:sharePlace.id, place_id:sharePlace.place_id}}).pipe(take(1)).subscribe(res => {
      localStorage.setItem("place", JSON.stringify(res.data));
      this.loadPlace();
    });
  }

}
