import {Injectable, OnInit} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment.development";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService{

  private isCreador: boolean = false;
  private recetaAlmacenada: number = 0;

  // Inicializa booleanVariable en true por defecto
  private booleanVariable: boolean = true;

  // Define la URL base para las peticiones de autenticación
  public baseUrl: string = `${environment.apiUrl}/auth`;

  // Define un BehaviorSubject para gestionar el estado del modal
  private mostrarModalSesionExpiradaSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  getrecetaAlmacenada(): number {
    return this.recetaAlmacenada;
  }

  setrecetaAlmacenada(value: number) {
    this.recetaAlmacenada = value;
  }

  // Método para activar o desactivar el modal
  activarModalSesionExpirada(activar: boolean): void {
    this.mostrarModalSesionExpiradaSubject.next(activar);
  }

  // Método para obtener el estado del modal
  obtenerEstadoModalSesionExpirada(): Observable<boolean> {
    return this.mostrarModalSesionExpiradaSubject.asObservable();
  }

  // Método para establecer la variable booleana
  setBooleanVariable(value: boolean): void {
    this.booleanVariable = value;
  }

  // Método para obtener el valor actual de la variable booleana
  getBooleanVariable(): boolean {
    return this.booleanVariable;
  }


}
