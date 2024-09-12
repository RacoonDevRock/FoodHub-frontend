import { Categoria } from "./Categoria";
import { IngredienteDTO } from "./IngredienteDTO";
import { InstruccionDTO } from "./InstruccionDTO";

export interface RecetaDTO {
  id?: number;
  titulo: string;
  descripcion: string;
  tiempoCoccion: number;
  porciones: number;
  calorias: number;
  imagen: string;
  categoria: Categoria;
  ingredientes: IngredienteDTO[];
  instrucciones: InstruccionDTO[];
}
