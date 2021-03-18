import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { ConfiguracionUtil } from "../util/configuracionUtil";
import { SessionService } from "./sessionService";

@Injectable({ providedIn : 'root' })
export class AutenticacionService {

    public constructor(private httpClient:HttpClient,
                       private sessionService:SessionService){
    }

    public login(usuario:Usuario):void{
        
        let observable:Observable<any> = this.httpClient.post(ConfiguracionUtil.urlServidor+"/login", usuario)
        observable.subscribe(
            data => {
                this.sessionService.setItem("JWT",data.JWT)
                this.sessionService.setItem("usuario",data.usuario)
            },
            error => {
            }
        )
    
    
    }

}