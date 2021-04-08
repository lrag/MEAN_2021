import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from "src/app/servicios/sessionService";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";

//Este servicio se encargará de proporcionar un pedido a todos los componentes
//que estén relacionados con la cesta/carrito de la compra
@Injectable( { providedIn : 'root' } )
export class CestaService {

    private subject:BehaviorSubject<Pedido> //Undefined
    private nombreCesta:string

    public constructor(private sessionService:SessionService,
                       private autenticacionService:AutenticacionService,
                       private httpClient:HttpClient){
        //La cesta estará en el SessionService y su clave incluirá el _id del usuario
        let usuario = this.autenticacionService.getUsuario()
        this.nombreCesta = "cesta_"+usuario._id
    }

    //Muchos componentes de la aplicacion necesitan la cesta
    //No sabemos exactamente cual será el primero en necesitarla
    public getCesta():BehaviorSubject<Pedido>{
      

        //El primero que invoque 'getCesta' disparará:
        //-la creación del subject
        //-la creacion de la cesta
        //-guardar la cesta en el SessionService (local storage)
        //-la emisión del primer evento
        if(!this.subject){

            let cesta = this.sessionService.getItem( this.nombreCesta )
            if(cesta){
                //El objeto se ha creado a partir de un JSON que tenemos en el localStorage
                //Se le ha hecho un parse y NO TIENE LAS FUNCIONES DE LA PEDIDO!
                Object.setPrototypeOf(cesta, Pedido.prototype)
            } else {
                cesta = new Pedido()
                cesta.usuario = this.autenticacionService.getUsuario()
                this.sessionService.setItem(this.nombreCesta, cesta, true)
            }

            this.subject = new BehaviorSubject(cesta)
        }

        return this.subject
    }

    //Esto guarda la cesta en el LOCAL STORAGE
    public setCesta(cesta){
        this.sessionService.setItem(this.nombreCesta, cesta, true)
        this.subject.next(cesta)
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
                    Object.setPrototypeOf(cestaInsertada, Pedido.prototype)
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



