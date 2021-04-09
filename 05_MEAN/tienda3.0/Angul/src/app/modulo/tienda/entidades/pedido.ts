import { DetallePedido } from "../entidades/detallePedido";
import { Usuario } from "../../usuarios/entidades/usuario";
import { Producto } from "./producto";


export class Pedido{
    
    public constructor(
        public _id         :string=null,
        public codigo      :string=null,
        public fecha       :string=null,
        public estado      :string=null,
        public total       :number=null,
       
        public usuario      : Usuario=null,
        public detalles     : DetallePedido[] = [],
        //necesario para la compra
        public dirEntrega   :string=null,
        public formaPago    :string=null,
        public fechaEntrega :string=null,


    ){}

    //funciones
   
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


//Calculadno pedio
private calcularTotal():void{
    let total = 0
    //for(let detalle of this.detalles){
    //    total += detalle.cantidad*detalle.precio
    //}
    this.detalles.forEach( detalle => total+=detalle.precio*detalle.cantidad ) //hecha con funciones de array
    this.total = total

    //guardar
    //provisional!
    //localStorage.setItem("cesta", JSON.stringify(this)) el dia lunes 05/04

    //ya no es necesario con el (behavior)
    //localStorage.setItem("cesta_"+this.usuario._id, JSON.stringify(this))

}

    //disminuir la cantidad de un produycto en 1
    //si no existye el producto en la cesta pues nada, que no falle
    //si existe y la cantidad queda a 0 que s eelimine

public disminuirCantidad(producto:Producto):void{

    let detalle= this.detalles.find(function(d){
        return d.producto._id== producto._id //funcion anonima, ademas de ser un closure
    })
    if(!detalle){
        return
    }
    detalle.cantidad-=1
    if(detalle.cantidad==0){
        this.eliminarDetalle(producto)
    }
    this.calcularTotal()
}

//eliminar detalle del que contiene le producto recibido
public eliminarDetalle(producto:Producto){
    for (let a=0; a<this.detalles.length;a++){
        if(this.detalles[a].producto._id==producto._id){
            this.detalles.splice(a,1)
            this.calcularTotal()
            break
        } 
    }

}

public vaciarCesta(){
    this.detalles=[]
    this.calcularTotal()
    
}


}

