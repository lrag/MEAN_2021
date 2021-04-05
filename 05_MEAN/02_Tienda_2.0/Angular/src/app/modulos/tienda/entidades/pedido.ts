import { Usuario } from "../../usuarios/entidades/usuario";
import { DetallePedido } from "./detallePedido";
import { Producto } from "./producto";


export class Pedido {

    constructor(
        public _id      : string          = null,
        public codigo   : string          = null,
        public fecha    : string          = null,
        public estado   : string          = null, 
        public total    : number          = null,
        public usuario  : Usuario         = null,
        public detalles : DetallePedido[] = []
    ){}

    //FUNCIONES

    public addProducto(cantidad:number, producto:Producto){
        //Si no hay un detalle con el producto recibido hay que crearlo y añadirlo
        //pero si ya existe hay que 'combinarlo'
    }

    private calcularTotal():void{

    }

}