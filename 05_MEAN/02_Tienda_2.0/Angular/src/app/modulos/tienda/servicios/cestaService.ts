import { Injectable } from "@angular/core";
import { SessionService } from "src/app/servicios/sessionService";
import { Pedido } from "../entidades/pedido";

//Este servicio se encargará de proporcionar un pedido a todos los componentes
//que estén relacionados con la cesta/carrito de la compra
@Injectable( { providedIn : 'root' } )
export class CestaService {

    public constructor(private sessionService:SessionService){
    }

    //Muchos componentes de la aplicacion necesitan la cesta
    //No sabemos exactamente cual será el primero en necesitarla
    //
    public getCesta():Pedido{
      
        //La cesta estará en el SessionService
        let cesta = this.sessionService.getItem("cesta")
        //Debemos añadir a la cesta las funciones que le faltan!!!!


        //La primera vez que se llame aqui la cesta no existe
        if(!cesta){
            //Creamos un pedido y lo guardamos en el sessionService especificando
            //persistente=true
            cesta = new Pedido()
            this.sessionService.setItem("cesta", cesta, true)
        }

        return cesta
    }

}