import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html'
})
export class CestaComponent implements OnInit {

  public cesta:Pedido
  public mensaje:string = ""

  constructor(private cestaService:CestaService,
              private router:Router) { 
    //El que quiere la cesta recibe un BehaviorSubject al que se subscribe
    //para ir recibiendo la cesta cada vez que cambie
    cestaService
      .getCesta()
      .subscribe( cesta => { 
        console.log("Recibiendo una nueva cesta en CestaComponent")
        this.cesta=cesta 
      })

  }

  ngOnInit(): void {
  }

  public vaciarCesta():void{
    this.cestaService.nuevaCesta()
  }

  public guardar():void{
    if(this.cesta.detalles.length == 0){
      this.mensaje = "No hay detalles en la cesta"
      return
    }

    this.cestaService.guardarCesta(this.cesta)
    .subscribe(
      () => { 
        console.log("CESTA GUARDADA") 
      },
      error => this.mensaje = error.mensaje
    )
  }

  public comprar():void{
    if(this.cesta.detalles.length == 0){
      this.mensaje = "No hay detalles en la cesta"
      return
    }

    this.router.navigate([
      "/tienda",
      {
        outlets : {
          'primary' : ['compra'],
          'der'     : ['resumenCesta']
        }
      }
    ], { skipLocationChange : true })    
  }

}
