import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

 if (req.url.includes('/api/otp') ||
      req.url.includes('/api/forgot')) {

    return next(req);
  }
  const token = localStorage.getItem('token');

  if (token) {

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('TOKEN SENT:', token);

    return next(cloned);
  }

  return next(req);
};
