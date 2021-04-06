export class CriterioBusquedaProducto {

    public constructor(
        public texto      : string = null, 
        public categoria  : string = null,
        public fabricante : string = null,
        public precioMin  : string = null,
        public precioMax  : string = null,
    ){}

}