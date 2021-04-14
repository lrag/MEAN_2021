import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';
import { ComprasService } from '../../servicios/comprasService';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html'
})
export class ConfirmacionCompraComponent implements OnInit {

  public cesta:Pedido
  public mensaje:string
  public mensajeError:string

  constructor(private cestaService:CestaService,
              private comprasService:ComprasService) { 
    //this.cesta = cestaService.getCesta()
    cestaService
      .getCesta() //devuelve el subject
      .subscribe( cesta => this.cesta=cesta ) //nos subscribimos 
  }

  ngOnInit(): void {
  }

  public confirmarCompra(){
    
    //Validar que el usuario ha rellenado los datos
    //...

    this.comprasService.comprar(this.cesta)
    .subscribe(
      respuesta => {
        this.mensaje = respuesta.mensaje
        this.mensajeError = null
      },
      error => this.mensajeError = error.error.mensaje 
    )


  }

}


