import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";
import { SessionService } from "src/app/servicios/sessionService";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Pedido } from "../entidades/pedido";

//Este servicio se encargará de proporcionar un pedido a todos los componentes
//que estén relacionados con la cesta/carrito de la compra
@Injectable( { providedIn : 'root' } )
export class CestaService {

  private subject:BehaviorSubject<Pedido> //udnefined
  private nombreCesta:string

    public constructor(private sessionService:SessionService,
                       private autenticacionService:AutenticacionService,
                       private HttpClient:HttpClient){

        //La cesta estará en el SessionService y su clave incluirá el _id del usuario
        let usuario = this.autenticacionService.getUsuario()
        this.nombreCesta = "cesta_"+usuario._id            
    }

    //Muchos componentes de la aplicacion necesitan la cesta 
    //No sabemos exactamente cual será el primero en necesitarla
    //
    public getCesta():BehaviorSubject<Pedido>{

       /*
        //La cesta estará en el SessionService y su clave incluirá el _id del usuario
        let usuario = this.autenticacionService.getUsuario()
        let nombreCesta = "cesta_"+usuario._id
        */
        //el primero que invoque getCesta disparara la creacion del subject
        //-creacion de la cesta
        //gurdar la cesta eb ek sessionSErvice (localStorage
        //emision del primer evento)
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
    
        /* por el Behavior
         //La cesta estará en el SessionService
         let cesta = this.sessionService.getItem("cesta")

        cesta = this.sessionService.getItem(nombreCesta) //aqui utiliza para buscar los item del detalle pedido
        console.log('--------CEsta con los datos del uSuario-------------------')
        //La primera vez que se llame aqui la cesta no existe
        //Debemos añadir a la cesta las funciones que le faltan!!!!
        if(cesta){
            console.log(cesta)
            console.log("La cesta ya existe")
            Object.setPrototypeOf(cesta, Pedido.prototype)
        } else {
            //Creamos un pedido y lo guardamos en el sessionService especificando
            //persistente=true
            console.log("Creando la cesta")
            cesta = new Pedido()
            //this.sessionService.setItem("cesta", cesta, true)
            cesta.usuario = usuario

            this.sessionService.setItem(nombreCesta, cesta, true)
        }

        return cesta
        */
    }
//------
    //se guarda la cesta en le Local STORAGE
    public setCesta(cesta){
        //let usuario=this.autenticacionService.getUsuario()
        //let nombreCesta='cesta_'+usuario._id
        
        //this.sessionService.setItem(nombreCesta,cesta,true)

        this.sessionService.setItem(this.nombreCesta, cesta, true)
        this.subject.next(cesta)
    }


    //aqui Guarda la cesta en Servidor
    public guardarCesta(cesta:Pedido):Observable<any>{
      //modicaciones con observable
      let observable=null

        if(!cesta._id){
        observable =    this.insertarCesta(cesta)
        }else{
        observable =   this.modificarCesta(cesta)
        }
        return observable
        //return this.HttpClient.post(ConfiguracionUtil.urlServidor+'/pedidos',cesta)

    }

    public insertarCesta(cesta:Pedido):Observable<any>{
        return  new Observable(subscribers=>{
            this.HttpClient.post(ConfiguracionUtil.urlServidor+'/pedidos',cesta)
            .subscribe(
                cestaInsertada=>{
                     //sustituir la cesta del localStorage por esta que tiene id
                     Object.setPrototypeOf(cestaInsertada, Pedido.prototype)
                    //ssutituir la cesla del localStorage por esta que tiene ID
                    this.setCesta(cestaInsertada)
                    subscribers.next()
                    subscribers.complete()
                },
                error=>{
                    subscribers.error(error)
                    subscribers.complete()
                }
            )
        })
        //return 

    }

    public modificarCesta(cesta:Pedido):Observable<any>{
        return this.HttpClient.put(ConfiguracionUtil.urlServidor+'/pedidos/'+cesta._id,cesta)

    }

    public listarCestas(){
        //Utilizaremos el Ajax

    }

    public eliminarCesta(){

        //Utilzaremos el Ajax

    }

    //Despues vemos 
    public seleccionarCesta(){

    }

}