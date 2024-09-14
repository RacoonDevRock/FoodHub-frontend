import type { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  // const authToken = sessionStorage.getItem('token');

  // Clonar la solicitud y agregar el encabezado de autorización
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req);
};