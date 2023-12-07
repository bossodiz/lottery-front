import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:8080/api';
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Access-Control-Allow-Origin', '*');

  const modifiedReq = req.clone({
    url: `${baseUrl}${req.url}`,
    headers,
  });
  return next(modifiedReq);
};
