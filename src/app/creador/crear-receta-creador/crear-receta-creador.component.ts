import { Component } from '@angular/core';
import { Categoria } from '../../interfaces/Categoria';
import { IngredienteDTO } from '../../interfaces/IngredienteDTO';
import { InstruccionDTO } from '../../interfaces/InstruccionDTO';
import { Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { RecetaDTO } from '../../interfaces/RecetaDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-receta-creador',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './crear-receta-creador.component.html',
  styleUrl: './crear-receta-creador.component.css'
})
export class CrearRecetaCreadorComponent {
  titulo: string = '';
  descripcion: string = '';
  tiempoCoccion: number = 0;
  porciones: number = 0;
  calorias: number = 0;
  categoria!: Categoria; // Valor por defecto
  imagen: string = '';

  ingredientes: IngredienteDTO[] = [{ ingrediente: '' }];
  instrucciones: InstruccionDTO[] = [{ instruccion: '' }];
  mostrarModalPublicado: boolean = false;

  selectedFile: File | null = null;
  base64Data: string | null = null;

  errorRegistro: boolean = false;
  cargando: boolean = false;

  constructor(private router: Router, private recetaService: RecetaService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.convertToBase64();
  }

  convertToBase64() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imagen = reader.result as string;
        this.validarCamposYPublicar();
      };
      reader.onerror = (error) => {
        console.log(`Error: ${error}`);
      };
    }
  }

  validarCamposYPublicar() {

    this.cargando = true;
    this.resetErrores();

    const nuevaReceta: RecetaDTO = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      tiempoCoccion: this.tiempoCoccion,
      porciones: this.porciones,
      calorias: this.calorias,
      categoria: this.categoria,
      ingredientes: this.ingredientes,
      instrucciones: this.instrucciones,
      imagen: this.imagen,
    };

    // Verificar si algún ingrediente está vacío
    if (this.ingredientes.some(ingrediente => !ingrediente.ingrediente)) {
      this.errorRegistro = true;
      this.cargando = false;
      return;
    }

    // Verificar si algún paso está vacío
    if (this.instrucciones.some(instruccion => !instruccion.instruccion)) {
      this.errorRegistro = true;
      this.cargando = false;
      return;
    }

    this.recetaService.crearReceta(nuevaReceta).subscribe((response:any) => {
        console.log(response)
        this.mostrarModalPublicado = true; // Lógica de validación de campos y creación de cuenta
        if (this.validarYCrearCuenta()) {
          this.mostrarModalPublicado = true;
          this.errorRegistro = false;
        }
        this.cargando = false;
      },
      (error) => {
        console.error('Error al crear la receta:', error);
        this.errorRegistro = true;
        this.cargando = false;
      }
    );

  }

  agregarIngrediente() {
    this.ingredientes.push({ ingrediente: '' });
  }

  eliminarIngrediente(index: number) {
    if (this.ingredientes.length > 1) {
      this.ingredientes.splice(index, 1);
    }
  }

  agregarPaso() {
    this.instrucciones.push({ instruccion: '' });
  }

  eliminarPaso(index: number) {
    if (this.instrucciones.length > 1) {
      this.instrucciones.splice(index, 1);
    }
  }

  cerrarModalPublicado() {
    this.mostrarModalPublicado = false;
    this.router.navigate(['/ingresar/gestionDeRecetas'])

  }

  private validarYCrearCuenta(): boolean {
    return true; // Lógica de validación y creación de cuenta
  }

  resetErrores(): void {
    this.errorRegistro = false;
  }
}

