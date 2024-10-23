import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isCreador: boolean = false;
  private recetaAlmacenada: number = 0;
  constructor() { }


  getrecetaAlmacenada(): number {
    return this.recetaAlmacenada;
  }

  setrecetaAlmacenada(value: number) {
    this.recetaAlmacenada = value;
  }


}
