import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AutoLogin } from './services/auto-login';
import { reqInterceptor } from './services/req-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }, 
    provideHttpClient(
      withInterceptors([reqInterceptor])
    ),
    
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(private http: HttpClient, private router: Router){
    let auto  = new AutoLogin(this.http, this.router);
    auto.login();
  }
}
