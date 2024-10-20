import { Component } from '@angular/core';
import { Categoria } from '../../interfaces/Categoria';
import { IngredienteDTO } from '../../interfaces/IngredienteDTO';
import { InstruccionDTO } from '../../interfaces/InstruccionDTO';
import { Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { RecetaDTO } from '../../interfaces/RecetaDTO';
import { FormsModule } from '@angular/forms';
import { ConnectionStatusService } from '../../services/connection-status.service';

@Component({
  selector: 'app-crear-receta-creador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-receta-creador.component.html',
  styleUrl: './crear-receta-creador.component.css',
})
export class CrearRecetaCreadorComponent {
  step: number = 1;
  titulo: string = '';
  descripcion: string = '';
  tiempoCoccion: number = 0;
  porciones: number = 0;
  calorias: number = 0;
  categoria!: Categoria;
  imagen: string = '';

  ingredientes: IngredienteDTO[] = [{ ingrediente: '' }];
  instrucciones: InstruccionDTO[] = [{ instruccion: '' }];
  mostrarModalPublicado: boolean = false;

  selectedFile: File | null = null;
  errorRegistro: boolean = false;
  cargando: boolean = false;
  isOnline: boolean = true;
  
  errores: Record<string, any> = {
    titulo: '',
    descripcion: '',
    tiempoCoccion: '',
    porciones: '',
    calorias: '',
    categoria: '',
    ingredientes: '',
    instrucciones: '',
    imagen: ''
  };

  constructor(
    private connectionStatusService: ConnectionStatusService,
    private router: Router,
    private recetaService: RecetaService
  ) {}

  ngOnInit(): void {
    this.connectionStatusService.getConnectionStatus().subscribe((isOnline) => {
      this.isOnline = isOnline;
      if (!isOnline) {
        console.log('datos guardados temporalmente');
        this.guardarDatosEnLocalStorage();
      }
    });

    this.loadFormData(); // Cargar datos guardados en localStorage al iniciar
  }

  guardarDatosEnLocalStorage() {
    const formData = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      tiempoCoccion: this.tiempoCoccion,
      porciones: this.porciones,
      calorias: this.calorias,
      categoria: this.categoria,
      ingredientes: this.ingredientes,
      instrucciones: this.instrucciones,
    };
    localStorage.setItem('recetaFormData', JSON.stringify(formData));
  }

  loadFormData() {
    const savedFormData = localStorage.getItem('recetaFormData');
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      this.titulo = formData.titulo || '';
      this.descripcion = formData.descripcion || '';
      this.tiempoCoccion = formData.tiempoCoccion || null;
      this.porciones = formData.porciones || null;
      this.calorias = formData.calorias || null;
      this.categoria = formData.categoria || null;
      this.ingredientes = formData.ingredientes || [{ ingrediente: '' }];
      this.instrucciones = formData.instrucciones || [{ instruccion: '' }];
    }
  }

  // Métodos para agregar y eliminar ingredientes
  agregarIngrediente() {
    this.ingredientes.push({ ingrediente: '' });
  }

  // Métodos para agregar y eliminar instrucciones
  agregarPaso() {
    this.instrucciones.push({ instruccion: '' });
  }

  validarCamposYPublicar() {
    this.guardarDatosEnLocalStorage();
    this.resetErrores();

    // Validar campos
    if (!this.validarCampos()) return;
    
    this.cargando = true;
    

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

    if (this.selectedFile) {
      this.recetaService.crearReceta(nuevaReceta, this.selectedFile).subscribe(
        (response: any) => {
          localStorage.removeItem('recetaFormData');
          this.mostrarModalPublicado = true;
          this.errorRegistro = false;
          this.cargando = false;
        },
        (error) => {
          this.manejarErrorImagen(error);
          this.errorRegistro = true;
          this.cargando = false;
        }
      );
    } else {
      this.errores['imagen'] = 'Debe seleccionar una imagen.';
      this.errorRegistro = true;
      this.cargando = false;
    }
  }

  manejarErrorImagen(error: any) {
    if (error.message.includes('imagen')) {
      this.errores['imagen'] = 'Error al subir la imagen, pero puede continuar creando la receta.';
    }
  }

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
      };
      reader.onerror = (error) => {
        console.log(`Error: ${error}`);
      };
    }
  }

  // Validar todos los campos
  validarCampos(): boolean {
    let esValido = true;

    if (!this.titulo) {
      this.errores['titulo'] = 'El título es obligatorio.';
      esValido = false;
    }
    if (!this.descripcion) {
      this.errores['descripcion'] = 'La descripción es obligatoria.';
      esValido = false;
    }
    if (!this.tiempoCoccion) {
      this.errores['tiempoCoccion'] = 'El tiempo de cocción es obligatorio.';
      esValido = false;
    }
    if (!this.porciones) {
      this.errores['porciones'] = 'Las porciones son obligatorias.';
      esValido = false;
    }
    if (!this.calorias) {
      this.errores['calorias'] = 'Las calorías son obligatorias.';
      esValido = false;
    }
    if (!this.categoria) {
      this.errores['categoria'] = 'La categoría es obligatoria.';
      esValido = false;
    }

    return esValido;
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  eliminarIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
    this.errores['ingredientes'].splice(index, 1); // Eliminar también el error correspondiente
  }

  eliminarPaso(index: number) {
    this.instrucciones.splice(index, 1);
    this.errores['instrucciones'].splice(index, 1); // Eliminar también el error correspondiente
  }

  cerrarModalPublicado() {
    this.mostrarModalPublicado = false;
    this.router.navigate(['/ingresar/gestionDeRecetas']);
  }

  resetErrores() {
    this.errorRegistro = false;
    this.errores = {
      titulo: '',
      descripcion: '',
      tiempoCoccion: '',
      porciones: '',
      calorias: '',
      categoria: '',
      ingredientes: [],
      instrucciones: [],
      imagen: ''
    };
  }
}
