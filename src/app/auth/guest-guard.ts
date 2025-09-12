import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let a = localStorage.getItem("auth");
  if(!a){
    return true;
  }

  router.navigateByUrl('home');
  return false;
};
