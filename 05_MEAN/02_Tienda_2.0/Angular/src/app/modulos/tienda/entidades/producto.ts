import { Categoria } from "./categoria";

export class Producto {

    public constructor(
        public _id         : string    = null,
        public nombre      : string    = null,
        public categoria   : Categoria = null,
        public fabricante  : string    = null,
        public descripcion : string    = null,
        public imagen      : string    = null,
        public precio      : number    = null,
        public existencias : number    = null
    ){}

}