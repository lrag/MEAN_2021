import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { ConfiguracionUtil } from "../../../util/configuracionUtil";
import { SessionService } from "../../../servicios/sessionService";
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

                    //Sincronizamos los relojes entre el servidor y el navegador para averiguar a que hora loca caduca el JWT 
                    console.log("====================================")
                    let cargamento:any = JSON.parse(atob(data.JWT.split(".")[1]))
                    console.log("Cargamento:",cargamento)

                    let horaServidor  = cargamento.iat 
                    //10:00:00
                    let horaExpiracion = cargamento.exp
                    //11:00:00
                    let horaNavegador = Math.floor(Date.now()/1000)
                    //13:00:00
                    let diferenciaHora = horaServidor-horaNavegador
                    //10800
                    let horaExpiracionJWT = horaExpiracion+diferenciaHora
                    //14:00:00

                    this.sessionService.setItem("horaExpiracionJWT", horaExpiracionJWT)                    

                    this.sessionService.setItem("JWT",data.JWT)
                    this.sessionService.setItem("usuario",data.usuario)
                    subscriber.next() //equivalente a la llamada a 'resolve' en una promesa'
                    subscriber.complete()
                },
                error => {
                    subscriber.error(error)
                    subscriber.complete()
                }
            )
        })
    }

    public logout():void{
        //Hay que eliminar el JWT y el usuario
        this.sessionService.clear()
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