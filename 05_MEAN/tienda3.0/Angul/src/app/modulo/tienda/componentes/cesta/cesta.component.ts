import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  //styleUrls: []
}) 
export class CestaComponent implements OnInit {

  public cesta:Pedido
  public mensaje:string=''

  constructor(private cestaService:CestaService,
              private router:Router) {

// this.cesta = cestaService.getCesta()                
    console.log('-------------Muestra la Cesta del constructor---------')
    console.log(this.cesta) //no esta trayendo la cesta
    
    //con los camvbios de behavior subject
    cestaService
          .getCesta() //para obtener la cesta
          .subscribe(
            cesta=> this.cesta=cesta
          )
    
   }

  ngOnInit(): void {
  }

public vaciarCesta():void{
  this.cesta.vaciarCesta()
  this.cestaService.getCesta() //para notificar todos los involucrados
}

public guardar():void{
  if(this.cesta.detalles.length==0){
    this.mensaje='No hay detalle en tu Cesta para guardar'
    console.log('No hay detalle en la para Guardar')
    return
  }

/* lo colocamos en cestaServices que es donde debe ir
  if(!tien id){
    this.cestaService.insertarCesta()
    //susituitr la cxesta que hay local Sotrage
  } else{
    this.cestaService.modificarCesta()
  }
*/

  this.cestaService.guardarCesta(this.cesta) 
          .subscribe(
            //respuesta=>{console.log("Cesta Guardada") /* console.log(respuesta) */},
            //error=>this.mensaje='La Hubo un error al guadar la cesta'
            ()=>{
              console.log("Cesta Guardada") 
            },
            error=>this.mensaje=error.mensaje
          )
}

public comprar():void{
  if(this.cesta.detalles.length==0){
    
    this.mensaje='No hay detalle en u tu carrito de compra'
    console.log('No hay detalle en la Compra')
    return
  }
  this.router.navigateByUrl('/tienda/compra')
}

}
