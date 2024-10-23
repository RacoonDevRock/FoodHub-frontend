import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); 

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(['/iniciarSesion']);
      }

      return of(error);
    })
  );
};