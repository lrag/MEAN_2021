import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido } from '../../entidades/detallePedido';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-detallePedido',
  templateUrl: './detallePedido.component.html'
})
export class DetallePedidoComponent implements OnInit {

  @Input()
  public detalle:DetallePedido

  @Input()
  private cesta:Pedido

  constructor(/*private cestaService:CestaService*/) { 
    //this.cesta = cestaService.getCesta()
  }

  ngOnInit(): void {
  }

  public aumentarCantidad():void{
    this.cesta.addProducto(1, this.detalle.producto)
  }
  
  public disminuirCantidad():void{
    this.cesta.disminuirCantidad(this.detalle.producto)
  }

  public borrarDetalle():void{
    this.cesta.eliminarDetalle(this.detalle.producto)
  }

}






