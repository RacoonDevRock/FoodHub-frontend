import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreadorDTO } from '../interfaces/CreadorDTO';
import { Observable } from 'rxjs';
import { AuthDTO } from '../interfaces/AuthDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl: string = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  registrarCreador(creadorDTO: CreadorDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registrar`, creadorDTO);
  }

  confirmation(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirmar?token=${token}`);
  }

  iniciarSesionCreador(authDTO: AuthDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, authDTO, {
      withCredentials: true,
    });
  }
}
