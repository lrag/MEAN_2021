import { Usuario } from "../../usuarios/entidades/usuario";
import { Producto } from "./producto";


export class DetallePedido {

    constructor(
        public cantidad : number = null,
        public precio   : number = null,
        public producto : Producto = null
    ){}
    
}