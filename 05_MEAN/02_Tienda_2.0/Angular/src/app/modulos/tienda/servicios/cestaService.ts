import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from "src/app/servicios/sessionService";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { Usuario } from "../../usuarios/entidades/usuario";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";

//Este servicio se encargará de proporcionar un pedido a todos los componentes
//que estén relacionados con la cesta/carrito de la compra
@Injectable( { providedIn : 'root' } )
export class CestaService {

    private subject:BehaviorSubject<Pedido> //Undefined
    private nombreCesta:string
    private usuario:Usuario

    public constructor(private sessionService:SessionService,
                       private autenticacionService:AutenticacionService,
                       private httpClient:HttpClient){
        //La cesta estará en el SessionService y su clave incluirá el _id del usuario
        this.usuario = this.autenticacionService.getUsuario()
        this.nombreCesta = "cesta_"+this.usuario._id
    }

    //Muchos componentes de la aplicacion necesitan la cesta
    //No sabemos exactamente cual será el primero en necesitarla
    //
    //getCesta no devuelve una cesta. Devuelve un subject al que subscribirse para obtener
    //la cesta
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
                cesta.usuario = this.usuario
                this.sessionService.setItem(this.nombreCesta, cesta, true) //El true es para que lo guarde en local
            }
            this.subject = new BehaviorSubject(cesta)
        }
        return this.subject
    }

    //Esto guarda una cesta en el LOCAL STORAGE
    //Y avisa a todo el mundo de que la cesta ha cambiado
    public setCesta(cesta){
        if(cesta.constructor != Pedido){
            Object.setPrototypeOf(cesta, Pedido.prototype)
        }
        this.sessionService.setItem(this.nombreCesta, cesta, true)
        this.subject.next(cesta)
    }

    public nuevaCesta():void{
        let cesta = new Pedido()
        cesta.usuario = this.usuario
        this.setCesta(cesta)
    }

    ///////////////
    // ZONA AJAX //
    ///////////////

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

    public listarCestas():Observable<any>{
        return this.httpClient.get(ConfiguracionUtil.urlServidor+`/usuarios/${this.usuario._id}/pedidos`)
    }

    public borrarCesta(cesta:Pedido){
        return this.httpClient.delete(ConfiguracionUtil.urlServidor+`/pedidos/${cesta._id}`)
    }
   
}



