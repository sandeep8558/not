import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacePage } from './place.page';

const routes: Routes = [
  {
    path: '',
    component: PlacePage,
    children: [
      {
        path: 'room/:id',
        loadChildren: () => import('./room/room.module').then( m => m.RoomPageModule)
      },
      {
        path: 'timer',
        loadChildren: () => import('./timer/timer.module').then( m => m.TimerPageModule)
      },
      {
        path: 'share',
        loadChildren: () => import('./share/share.module').then( m => m.SharePageModule)
      },
      {
        path: '',
        redirectTo: 'room',
        pathMatch: 'prefix',
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacePageRoutingModule {}
