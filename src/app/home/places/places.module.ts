import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { PlacesPage } from './places.page';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { reqInterceptor } from 'src/app/services/req-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PlacesPage],
  providers: [
    provideHttpClient(
      withInterceptors([reqInterceptor])
    ),
  ]
})
export class PlacesPageModule {}
