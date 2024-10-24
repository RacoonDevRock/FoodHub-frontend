import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {SharedService} from "../services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private sharedService: SharedService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(isAuth => {
        console.log('Auth status:', isAuth); // Log para ver si llega hasta aquí
        if (isAuth) {
          return true; // El usuario está autenticado, puede acceder
        } else {
          console.log('Redirigiendo a iniciar sesión');
          this.sharedService.activarModalSesionExpirada(true);
          this.router.navigate(['/iniciarSesion']); // Redirigir al inicio de sesión si no está autenticado
          return false;
        }
      }),
      catchError(() => {
        console.log('Error al verificar la autenticación, redirigiendo a iniciar sesión');
        this.sharedService.activarModalSesionExpirada(true);
        this.router.navigate(['/iniciarSesion']); // En caso de error, redirigir al login
        return of(false); // Bloquear el acceso si hay un error
      })
    );
  }

}
