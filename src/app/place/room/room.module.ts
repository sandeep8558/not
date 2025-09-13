import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomPageRoutingModule } from './room-routing.module';

import { RoomPage } from './room.page';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { reqInterceptor } from 'src/app/services/req-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RoomPage],
  providers: [
    provideHttpClient(
      withInterceptors([reqInterceptor])
    ),
  ]
})
export class RoomPageModule {}
