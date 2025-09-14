import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharePageRoutingModule } from './share-routing.module';

import { SharePage } from './share.page';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { reqInterceptor } from 'src/app/services/req-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SharePage],
  providers: [
    provideHttpClient(
      withInterceptors([reqInterceptor])
    ),
  ]
})
export class SharePageModule {}
