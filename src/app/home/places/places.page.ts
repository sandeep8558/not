import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs';
import { PlaceModel } from 'src/app/datamodel/PlaceModel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
  standalone: false,
})
export class PlacesPage implements OnInit {

  public places: PlaceModel[] = [];
  public isPlacesFormOpen: boolean = false;

  placeForm = new FormGroup({
    place_name: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    ssid: new FormControl("", [Validators.required]),
    pswd: new FormControl("", [Validators.required]),
    id: new FormControl(""),
  });

  constructor(private http: HttpClient, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getPlaces();
  }

  getPlaces(){
    let path = environment.host + "/api/places";
    this.http.get<PlaceModel[]>(path).pipe(take(1)).subscribe(places => {
      this.places = places;
    });
  }

  savePlace(){
    if(this.placeForm.value["id"]){
      this.updatePlace();
    } else {
      this.addPlace();
    }
  }

  addPlace(){
    let path = environment.host + "/api/places/add";
    let formData = this.placeForm.value;
    this.http.post(path, formData).pipe(take(1)).subscribe(data=>{
      this.placeForm.reset();
      this.isPlacesFormOpen = false;
      this.getPlaces();
    });
  }

  updatePlace(){
    let path = environment.host + "/api/places/update";
    let formData = this.placeForm.value;
    this.http.post(path, formData).pipe(take(1)).subscribe(data=>{
      this.placeForm.reset();
      this.isPlacesFormOpen = false;
      this.getPlaces();
    });
  }

  deletePlace(id:any){
    let path = environment.host + "/api/places/delete";
    this.http.delete(path, {params: {id: id}}).subscribe(data=>{
      this.getPlaces();
    });
  }

  async alertDeletePlace(id:any){
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deletePlace(id);
          }
        }
      ]
    });
    await alert.present();
  }

  closeForm(){
    this.placeForm.reset();
    this.isPlacesFormOpen = false;
  }

  editPlace(place:PlaceModel){
    this.isPlacesFormOpen = true;
    this.placeForm.get("place_name")?.setValue(place.place_name);
    this.placeForm.get("address")?.setValue(place.address);
    this.placeForm.get("ssid")?.setValue(place.ssid);
    this.placeForm.get("pswd")?.setValue(place.pswd);
    this.placeForm.get("id")?.setValue(place.id);
  }

  changePlace(place:PlaceModel){
    let p = JSON.stringify(place);
    localStorage.setItem("place", p);
    this.router.navigateByUrl("place/room");
  }

}
