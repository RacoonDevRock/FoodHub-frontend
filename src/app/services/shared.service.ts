import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private tipo: string ="";
  private recetaAlmacenada: number = 0;
  constructor() { }

  setTipo(tipo: string): void {
    this.tipo = tipo;
  }

  getTipo(): string {
    return this.tipo;
  }

  getrecetaAlmacenada(): number {
    return this.recetaAlmacenada;
  }

  setrecetaAlmacenada(value: number) {
    this.recetaAlmacenada = value;
  }


}
