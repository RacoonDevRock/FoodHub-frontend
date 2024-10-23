import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Si recibimos un 401 Unauthorized, el token ha sido eliminado o expirado
        authService.handleSessionExpiration();
        router.navigate(['/iniciarSesion']); // Redirigir al login
      }
      return throwError(() => error); // Lanzar el error para continuar el flujo de error
    })
  );
};
