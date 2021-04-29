import { Component, OnInit } from '@angular/core';
import { DetallePedido } from '../../entidades/detallePedido';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-resumen-cesta',
  templateUrl: './resumen-cesta.component.html'
})
export class ResumenCestaComponent implements OnInit {

  public cesta:Pedido

  constructor(private cestaService:CestaService) {
    //Gec cesta no devuelve la cesta. Devuelve el subject que nos entregará la cesta cuando corresponda
    cestaService.getCesta()
    .subscribe(
      cesta => this.cesta = cesta
    )
  }

  ngOnInit(): void {
  }

  public aumentarCantidad(detalle:DetallePedido):void{
    this.cesta.addProducto(1, detalle.producto)
    this.cestaService.setCesta(this.cesta)
  }

  public disminuirCantidad(detalle:DetallePedido):void{
    this.cesta.disminuirCantidad(detalle.producto)
    this.cestaService.setCesta(this.cesta)
  }
  
  public borrarDetalle(detalle:DetallePedido):void{
    this.cesta.eliminarDetalle(detalle.producto)
    this.cestaService.setCesta(this.cesta)
  }

}
