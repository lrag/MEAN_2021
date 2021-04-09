import { Producto } from "../../tienda/entidades/producto";

export class DetallePedido{
    constructor(
       public cantidad    :Number,
       public precio      :Number,
        public producto:Producto=null
    ){}
}