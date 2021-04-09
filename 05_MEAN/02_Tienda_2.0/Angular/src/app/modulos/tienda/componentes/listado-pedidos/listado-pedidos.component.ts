import { Component, OnInit } from '@angular/core';
import { CriterioBusquedaProducto } from '../../entidades/criterioBusquedaProducto';
import { Pedido } from '../../entidades/pedido';
import { Producto } from '../../entidades/producto';
import { CestaService } from '../../servicios/cestaService';
import { ProductosService } from '../../servicios/productosService';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: []
})
export class ListadoPedidosComponent implements OnInit {

  public pedidos:Pedido[]

  constructor(private cestaService:CestaService) { 
    this.listarPedidos()
  }
  
  ngOnInit(): void {
  }

  public listarPedidos():void{
    this.cestaService.listarCestas()
    .subscribe(
      pedidos => this.pedidos = pedidos,
      error => console.log(error)
    )
  }

}