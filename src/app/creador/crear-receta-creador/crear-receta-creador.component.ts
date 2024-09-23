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
  step: number = 1; // Estado del paso actual
  titulo: string = '';
  descripcion: string = '';
  tiempoCoccion: number | null = null;
  porciones: number | null = null;
  calorias: number | null = null;
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

    if (this.tiempoCoccion == null || this.porciones == null || this.calorias == null || !this.titulo || !this.descripcion || !this.categoria) {
      this.errorRegistro = true;
      return;
    }

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
      imagen: this.imagen, // Esto es innecesario ahora
    };

    // Verificar si algún ingrediente o instrucción está vacío
    if (this.ingredientes.some(ingrediente => !ingrediente.ingrediente) ||
        this.instrucciones.some(instruccion => !instruccion.instruccion)) {
      this.errorRegistro = true;
      this.cargando = false;
      return;
    }

    if (this.selectedFile) {
      // Llamar al servicio pasando el objeto recetaDTO y el archivo seleccionado
      this.recetaService.crearReceta(nuevaReceta, this.selectedFile).subscribe(
        (response: any) => {
          console.log(response);
          this.mostrarModalPublicado = true;
          this.errorRegistro = false;
          this.cargando = false;
        },
        (error) => {
          console.error('Error al crear la receta:', error);
          this.errorRegistro = true;
          this.cargando = false;
        }
      );
    } else {
      console.error('No se ha seleccionado ninguna imagen');
      this.errorRegistro = true;
      this.cargando = false;
    }
  }

  // Ir al siguiente paso
  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  // Volver al paso anterior
  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  // Métodos para agregar y eliminar ingredientes
  agregarIngrediente() {
    this.ingredientes.push({ ingrediente: '' });
  }

  eliminarIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }

  // Métodos para agregar y eliminar instrucciones
  agregarPaso() {
    this.instrucciones.push({ instruccion: '' });
  }

  eliminarPaso(index: number) {
    this.instrucciones.splice(index, 1);
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

