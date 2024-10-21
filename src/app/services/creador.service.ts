import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreadorService {
  public baseUrl: string = `${environment.apiUrl}/creador`;

  constructor(private http: HttpClient) {}

  obtenerCantidadRecetasCreadas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cantidadRecetas`, { withCredentials: true });
  }

  verPerfil(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/perfil`, { withCredentials: true });
  }

  actualizarFotoPerfil(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/actualizarFotoPerfil`, formData, { withCredentials: true });
  }
}
