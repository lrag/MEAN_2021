import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Pedido } from '../../entidades/pedido';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html'
})
export class ConfirmacionCompraComponent implements OnInit {

  public cesta:Pedido

  constructor() { 

  }

  ngOnInit(): void {
  }

  public confirmarCompra(){

  }

}


