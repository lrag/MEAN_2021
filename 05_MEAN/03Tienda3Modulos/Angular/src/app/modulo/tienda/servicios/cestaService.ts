import { Injectable } from "@angular/core";
import { SessionService } from "src/app/servicios/sessionService";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";

//Este servicio se encargará de proporcionar un pedido a todos los componentes
//que estén relacionados con la cesta/carrito de la compra
@Injectable( { providedIn : 'root' } )
export class CestaService {

  
    public constructor(private sessionService:SessionService,
                       private autenticacionService:AutenticacionService){
    }

    //Muchos componentes de la aplicacion necesitan la cesta
    //No sabemos exactamente cual será el primero en necesitarla
    //
    public getCesta():Pedido{

        //La cesta estará en el SessionService
        let cesta = this.sessionService.getItem("cesta")
        //La cesta estará en el SessionService y su clave incluirá el _id del usuario
        let usuario = this.autenticacionService.getUsuario()
        let nombreCesta = "cesta_"+usuario._id

        cesta = this.sessionService.getItem(nombreCesta)
        //La primera vez que se llame aqui la cesta no existe
        //Debemos añadir a la cesta las funciones que le faltan!!!!
        if(cesta){
            console.log("La cesta ya existe")
            Object.setPrototypeOf(cesta, Pedido.prototype)
        } else {
            //Creamos un pedido y lo guardamos en el sessionService especificando
            //persistente=true
            console.log("Creando la cesta")
            cesta = new Pedido()
            this.sessionService.setItem("cesta", cesta, true)
            cesta.usuario = usuario

            this.sessionService.setItem(nombreCesta, cesta, true)
        }

        return cesta
    }
}