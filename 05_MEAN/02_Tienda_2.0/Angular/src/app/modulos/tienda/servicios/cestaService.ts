import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionService } from "src/app/servicios/sessionService";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";

//Este servicio se encargará de proporcionar un pedido a todos los componentes
//que estén relacionados con la cesta/carrito de la compra
@Injectable( { providedIn : 'root' } )
export class CestaService {

    public constructor(private sessionService:SessionService,
                       private autenticacionService:AutenticacionService,
                       private httpClient:HttpClient){
    }

    //Muchos componentes de la aplicacion necesitan la cesta
    //No sabemos exactamente cual será el primero en necesitarla
    public getCesta():Pedido{
      
        //La cesta estará en el SessionService y su clave incluirá el _id del usuario
        let usuario = this.autenticacionService.getUsuario()
        let nombreCesta = "cesta_"+usuario._id

        let cesta = this.sessionService.getItem(nombreCesta)
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
            cesta.usuario = usuario
            
            this.sessionService.setItem(nombreCesta, cesta, true)
        }

        return cesta
    }

    //Esto guarda la cesta en el LOCAL STORAGE
    public setCesta(cesta){
        let usuario = this.autenticacionService.getUsuario()
        let nombreCesta = "cesta_"+usuario._id
        this.sessionService.setItem(nombreCesta, cesta, true)
    }

    //Esto guarda la cesta EN EL SERVIDOR
    public guardarCesta(cesta:Pedido):Observable<any>{
        let observable = null
        if(!cesta._id){
            observable = this.insertarCesta(cesta)
        } else {
            observable = this.modificarCesta(cesta)
        }
        return observable
    }

    public insertarCesta(cesta:Pedido):Observable<any>{
        
        return new Observable( subscribers => {
            this.httpClient.post(ConfiguracionUtil.urlServidor+"/pedidos", cesta)
            .subscribe(
                cestaInsertada => {
                    //sustituir la cesta del localStorage por esta que tiene id
                    this.setCesta(cestaInsertada)
                    subscribers.next()
                    subscribers.complete()
                },
                error => {
                    subscribers.error(error)
                    subscribers.complete()
                }
            )
        })
    }

    public modificarCesta(cesta:Pedido):Observable<any>{
        return this.httpClient.put(ConfiguracionUtil.urlServidor+"/pedidos/"+cesta._id, cesta)
    }

    public listarCestas(){
        //AJAX
    }

    public borrarCesta(){
        //AJAX
    }

    //Despues...
    public seleccionarCesta(){

    }
    
}