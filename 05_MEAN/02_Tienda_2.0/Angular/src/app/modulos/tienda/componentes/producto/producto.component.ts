import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/servicios/sessionService';
import { DetallePedido } from '../../entidades/detallePedido';
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

  //Desde la plantilla no se utiliza esta cesta para nada
  private cesta:Pedido

  constructor(private cestaService:CestaService) { 
    this.cestaService
      .getCesta() //Devuelve el subject
      .subscribe( cesta => this.cesta=cesta ) //Se subscribe al subject
  }

  ngOnInit(): void {
  }

  public comprar():void{

    //Obtener la cesta de cestaService
    //Añadir un detalle a la cesta que incluya el producto
    //La cantidad será 1
    //El precio será el de catágolo

    //Esto es una putisima mierda
    //let detalle:DetallePedido = new DetallePedido(1, this.producto.precio, this.producto)
    //cesta.detalles.push(detalle)

    //En nuestra aplicación es la cesta, el pedido, el que sabe trabajar con los detalles
    this.cesta.addProducto(1, this.producto)
    this.cestaService.setCesta(this.cesta)
  }

}
