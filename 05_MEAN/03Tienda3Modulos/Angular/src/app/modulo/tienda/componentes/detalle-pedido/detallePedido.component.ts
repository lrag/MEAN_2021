import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido } from '../../entidades/detallePedido';

@Component({
  selector: 'app-detallePedido',
  templateUrl: './detalle-pedido.component.html'
})

export class DetallePedidoComponent implements OnInit {

  @Input() //validar para que se usa
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