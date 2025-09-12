import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { reqInterceptor } from '../services/req-interceptor';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    provideHttpClient(
      withInterceptors([reqInterceptor])
    ),
  ]
})
export class HomePageModule {}
