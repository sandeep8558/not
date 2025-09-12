import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const reqInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const token = localStorage.getItem('notsystem');
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(modifiedReq);

};
