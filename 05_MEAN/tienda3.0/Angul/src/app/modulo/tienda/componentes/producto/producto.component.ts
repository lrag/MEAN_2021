
import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from '../../entidades/pedido';
import { Producto } from '../../entidades/producto';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

  //Este componente recibe el valor 'producto' via selector
  @Input()
  public producto:Producto = new Producto()

  private cesta:Pedido
  constructor(private cestaService:CestaService) 
  {
    this.cestaService
          .getCesta() //para obtener la cesta
          .subscribe(
            cesta=> this.cesta=cesta
          )
   }

  ngOnInit(): void {
  
  }
    
    public comprar():void{
    //Obtner la cesta de cestaService
    //Añadir un detall a la cesta que inlcuya el producto
    //la cantidad sera 1
    //Elprecio ser el del catalogo
    
    //let cesta:Pedido=this.cestaService.getCesta()
    //con los camvbios de behavior subject
    

    //esto es una putisima 
    //let detalle:DEtallepedido=new DetallePedido(1,this.producto.precio,this.producto)
    //cesta.detalls.push(detalle)

    //En nuestra aplicaion es la cesta, el pedio el que se sabe trabar con los detalles
    
    //this.cesta=this.cestaService.getCesta() //cualquier sea el caso pido primero la cesta
    this.cesta.addProducto(1,this.producto)
    this.cestaService.setCesta(this.cesta) //aqui cambia y actualiza y avisa al resto de component
}


}