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

  //@Input()
  private cesta:Pedido

  constructor(private cestaService:CestaService) { 
    //this.cesta = cestaService.getCesta()
    cestaService
      .getCesta()
      .subscribe( cesta => { 
        console.log("Recibiendo una nueva cesta en DetallePedidoComponent")
        this.cesta=cesta 
      })
  }

  ngOnInit(): void {
  }

  public aumentarCantidad():void{
    this.cesta.addProducto(1, this.detalle.producto)
    this.cestaService.setCesta(this.cesta)
  }
  
  public disminuirCantidad():void{
    this.cesta.disminuirCantidad(this.detalle.producto)
    this.cestaService.setCesta(this.cesta)
  }
  
  public borrarDetalle():void{
    this.cesta.eliminarDetalle(this.detalle.producto)
    this.cestaService.setCesta(this.cesta)
  }

}

