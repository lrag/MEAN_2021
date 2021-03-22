import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { ConfiguracionUtil } from "../util/configuracionUtil";
import { SessionService } from "./sessionService";
import { UsuariosService } from "./usuariosService";

@Injectable({ providedIn : 'root' })
export class AutenticacionService {

    public constructor(private httpClient:HttpClient,
                       private sessionService:SessionService,
                       private usuariosService:UsuariosService){
    }

    public getUsuario():Usuario{
        return this.sessionService.getItem("usuario")
    }

    public getJWT():string{
        return this.sessionService.getItem("JWT")
    }

    public login(usuario:Usuario):Observable<any>{
        return new Observable( subscriber => {
            let observable:Observable<any> = this.httpClient.post(ConfiguracionUtil.urlServidor+"/login", usuario)
            observable.subscribe(
                data => {
                    console.log(data)
                    this.sessionService.setItem("JWT",data.JWT)
                    this.sessionService.setItem("usuario",data.usuario)
                    subscriber.next()
                    subscriber.complete()
                },
                error => {
                    subscriber.error(error)
                    subscriber.complete()
                }
            )
        })
    }

    public modificarUsuario(usuario:Usuario):Observable<any>{

        //Hay que hacer dos cosas:
        //-enviar un put /usuarios/:id. Esto lo sabe hacer 'usuariosService'
        //-guardar el usuario con los datos nuevos en el session service. Esto se sabe aqui

        return new Observable( subscriber => {
            this.usuariosService.modificarUsuario(usuario)
            .subscribe(
                data => {
                    this.sessionService.setItem("usuario", usuario)
                    subscriber.next()
                    subscriber.complete()
                },
                error => {
                    subscriber.error(error)
                    subscriber.complete()
                }
            )
        })

    }

}