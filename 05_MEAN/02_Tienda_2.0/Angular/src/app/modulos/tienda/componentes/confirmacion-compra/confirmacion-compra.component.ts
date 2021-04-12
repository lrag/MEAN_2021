import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html'
})
export class ConfirmacionCompraComponent implements OnInit {

  public cesta:Pedido

  constructor(private cestaService:CestaService) { 
    //this.cesta = cestaService.getCesta()
    cestaService
      .getCesta() //devuelve el subject
      .subscribe( cesta => this.cesta=cesta ) //nos subscribimos 
  }

  ngOnInit(): void {
  }

  public confirmarCompra(){
    console.log(this.cesta)

    //

  }

}


