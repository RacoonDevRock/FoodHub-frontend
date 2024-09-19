import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RecetaDTO } from '../interfaces/RecetaDTO';
import { Observable } from 'rxjs';
import { RecetaCategoriaDTO } from '../interfaces/RecetaCategoriaDTO';
import { RecetaBodyDTO } from '../interfaces/RecetaBodyDTO';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  public baseUrl: string = `${environment.apiUrl}/explorar`;

  constructor(private http: HttpClient) {}

  crearReceta(recetaDTO: RecetaDTO, file: File): Observable<any> {
    const formData: FormData = new FormData();
  
    // Convertir recetaDTO a JSON y añadirla al FormData
    formData.append('receta', new Blob([JSON.stringify(recetaDTO)], {
      type: 'application/json'
    }));
  
    // Añadir el archivo de imagen al FormData
    formData.append('imagen', file);
  
    return this.http.post<any>(`${this.baseUrl}/crear`, formData);
  }

  mostrarRecetasPorCategoria(
    categoria: string
  ): Observable<RecetaCategoriaDTO[]> {
    return this.http.get<RecetaCategoriaDTO[]>(
      `${this.baseUrl}/recetas?categoria=${categoria}`
    );
  }

  verReceta(idReceta: number): Observable<RecetaBodyDTO> {
    return this.http.get<RecetaBodyDTO>(`${this.baseUrl}/${idReceta}`);
  }
}
