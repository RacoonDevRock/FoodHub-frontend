import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreadorDTO } from '../interfaces/CreadorDTO';
import {Observable, tap} from 'rxjs';
import { AuthDTO } from '../interfaces/AuthDTO';
import { CookieService } from 'ngx-cookie-service';
import {SharedService} from "./shared.service";
import {Router} from "@angular/router"; // Asegúrate de tener ngx-cookie-service instalado

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl: string = `${environment.apiUrl}/auth`;
  private authCheckInterval: any;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private sharedService: SharedService) {}

  registrarCreador(creadorDTO: CreadorDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registrar`, creadorDTO);
  }

  confirmation(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirmar?token=${token}`);
  }

  iniciarSesionCreador(authDTO: AuthDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, authDTO, {
      withCredentials: true,
    }).pipe(
      tap(() => {
        localStorage.setItem('isLoggedIn', 'true'); // Actualizar el estado de sesión en localStorage
      })
    );
  }

  // Cerrar sesión
  logout(): void {
    this.cookieService.delete('JWT-TOKEN');
    localStorage.setItem('isLoggedIn', 'false'); // Actualiza el estado de autenticación en localStorage
    this.router.navigate(['/iniciarSesion']);
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verify-auth`, {
      withCredentials: true, // Asegura que las cookies se envían y reciben
    });
  }

  // Maneja la expiración de sesión cuando el servidor devuelve 401 Unauthorized
  handleSessionExpiration(): void {
    localStorage.setItem('isLoggedIn', 'false'); // Actualiza el estado de autenticación en localStorage
    this.router.navigate(['/iniciarSesion']); // Redirige al login
  }




}
