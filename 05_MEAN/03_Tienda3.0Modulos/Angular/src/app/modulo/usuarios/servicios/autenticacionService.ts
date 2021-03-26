import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../../../entidades/usuario"; //
import {ConfiguracionUtil} from "../../../util/configuracionUtil"
import { SessionService } from "../../../servicios/sessionService";
import { UsuariosService } from "./usuariosService";



@Injectable({providedIn:'root'})
export class AutenticacionService {

    public constructor(private httpClient:HttpClient,
                       private sessionService:SessionService,
                       private usuariosService:UsuariosService
                       
                       ){

    }
    public getUsuario():Usuario{
        return this.sessionService.getItem("usuario")
    }

    public getJWT():string{
        return this.sessionService.getItem("JWT")
    }
    
//se le puede dara tyambien resposnabilidades de perfil
    public login(usuario:Usuario):Observable<any>{ //para otro url https
        return new Observable(subscriber=>{
            let observable:Observable<any>=this.httpClient.post(ConfiguracionUtil.urlServidor +"/login",usuario)
            observable.subscribe(
                data=>{
                    console.log(data)
                    this.sessionService.setItem("JWT",data.JWT)
                    this.sessionService.setItem("usuario",data.usuario)
                    subscriber.next()
                    subscriber.complete()
                },
                error=>{
                    subscriber.error(error)
                    subscriber.complete()

                })
        })
    }


    public modificarUsuario(usuario:Usuario):Observable<any>{
        //se requiere dos cosas
            //enviar un put /usuarios/:id esto los sabe hace 'usuarioServ ice'
            //guardar el usaurio con los daos nuevos en el sessionservice 

            return new Observable(subscriber=>{

                this.usuariosService.modificarUsuario(usuario)
                .subscribe(
                    data=>{
                        this.sessionService.setItem("usuario",usuario)
                        subscriber.next()
                        subscriber.complete()
                    },
                    error=>{
                        subscriber.error(error)
                        subscriber.complete
                    }
                )
            })
       
       
    }
} 