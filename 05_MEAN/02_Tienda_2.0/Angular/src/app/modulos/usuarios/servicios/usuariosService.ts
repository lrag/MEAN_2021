import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { ConfiguracionUtil } from "../../../util/configuracionUtil";
import { AutenticacionService } from "./autenticacionService";
import { SessionService } from "../../../servicios/sessionService";

@Injectable( { providedIn : 'root' })
export class UsuariosService {

    public constructor(private httpClient:HttpClient,
                       private sessionService:SessionService){
    }

    public comprobarLogin(login:string):Observable<any>{
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/comprobarLogin?login="+login)
    }

    public altaUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.post(ConfiguracionUtil.urlServidor+"/usuarios", usuario)
    }

    //POST /usuarios/:id
    //CT: app/json
    //Authorization: Bearer ghgfruigh5487hgurgh.fj5r3ughre8hy34.hf4f3uilhf249p7
    //---------------------------
    //{ usuario }
    public modificarUsuario(usuario:Usuario):Observable<any>{

        //Podemos añadir a mano el header authorization
        //El problema es que tendremos que hacerlo en 20.000 sitios
        //Mucho mejor que lo haga un interceptor
        /*
        let opciones = {
            headers : {
                Authorization : "Bearer "+this.sessionService.getItem("JWT")
            }
        }
        */

        return this.httpClient.put(ConfiguracionUtil.urlServidor+"/usuarios/"+usuario._id, usuario)
    }

    public bajaUsuario(){

    }

}
