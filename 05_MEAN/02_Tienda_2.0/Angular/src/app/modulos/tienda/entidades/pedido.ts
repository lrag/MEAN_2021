import { Usuario } from "../../usuarios/entidades/usuario";
import { DetallePedido } from "./detallePedido";


export class Pedido {

    constructor(
        public _id:string = null,
        public codigo:string = null,
        public fecha  : string = null,
        public estado : string = null, 
        public total  : number = null,
        public usuario:Usuario = null,
        public detalles:DetallePedido[] = null
    ){}

    //FUNCIONESksk


}