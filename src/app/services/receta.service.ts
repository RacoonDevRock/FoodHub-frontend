import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RecetaDTO } from '../interfaces/RecetaDTO';
import { Observable } from 'rxjs';
import { RecetaCategoriaDTO } from '../interfaces/RecetaCategoriaDTO';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  public baseUrl: string = `${environment.apiUrl}/explorar`;

  constructor(private http: HttpClient) {}

  crearReceta(recetaDTO: RecetaDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, recetaDTO);
  }

  mostrarRecetasPorCategoria(
    categoria: string
  ): Observable<RecetaCategoriaDTO[]> {
    return this.http.get<RecetaCategoriaDTO[]>(
      `${this.baseUrl}/recetas?categoria=${categoria}`
    );
  }

  verReceta(idReceta: number): Observable<RecetaDTO> {
    return this.http.get<RecetaDTO>(`${this.baseUrl}/${idReceta}`);
  }
}
