import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido } from '../../entidades/detallePedido';

@Component({
  selector: 'app-detallePedido',
  templateUrl: './detallePedido.component.html'
})
export class DetallePedidoComponent implements OnInit {

  public detalle:DetallePedido

  constructor() { 
  }

  ngOnInit(): void {
  }

  public aumentarCantidad():void{
  }
  
  public disminuirCantidad():void{
  }

  public borrarDetalle():void{
  }

}






