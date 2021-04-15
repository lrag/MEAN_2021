import { Categoria } from "./categoria";

export class CriterioBusquedaProducto {

    public constructor(
        public texto      : string = null, 
        //Esto podría ser perfectamente el id de la categoría en vez del objeto 
        public categoria  : number = null,
        public fabricante : string = null,
        public precioMin  : number = null,
        public precioMax  : number = null,
    ){}

}

