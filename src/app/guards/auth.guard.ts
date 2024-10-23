import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(isAuth => {
        if (isAuth) {
          return true; // El usuario está autenticado, puede acceder
        } else {
          this.router.navigate(['/iniciarSesion']); // Redirigir al inicio de sesión si no está autenticado
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/iniciarSesion']); // En caso de error, redirigir al login
        return of(false); // Bloquear el acceso si hay un error
      })
    );
  }
}
