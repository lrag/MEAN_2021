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
        
        /*
        let encontrado:boolean = false
        for(let detalle of this.detalles){
            if(detalle.producto._id == producto._id){
                detalle.cantidad += cantidad
                encontrado = true
                break
            }
        }

        if(encontrado==false){
            let detalle = new DetallePedido(cantidad, producto.precio, producto)
            this.detalles.push(detalle)
        }
        */

        let detalleEncontrado = this.detalles.find( detalle => detalle.producto._id==producto._id )
        if(detalleEncontrado){
            detalleEncontrado.cantidad += cantidad
        } else {
            let detalle = new DetallePedido(cantidad, producto.precio, producto)
            this.detalles.push(detalle)            
        }
        console.log(this.detalles)

        this.calcularTotal()
    }

    private calcularTotal():void{
        let total = 0
        //for(let detalle of this.detalles){
        //    total += detalle.cantidad*detalle.precio
        //}

        this.detalles.forEach( detalle => total+=detalle.precio*detalle.cantidad )
        this.total = total

        //guardar
        //provisional!
        localStorage.setItem("cesta", JSON.stringify(this))


    }

}