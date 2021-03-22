import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { ConfiguracionUtil } from "../util/configuracionUtil";

@Injectable( { providedIn : 'root' })
export class UsuariosService {

    public constructor(private httpClient:HttpClient){
    }

    public comprobarLogin(login:string):Observable<any>{
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/comprobarLogin?login="+login)
    }

    public altaUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.post(ConfiguracionUtil.urlServidor+"/usuarios", usuario)
    }

    public modificarUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.put(ConfiguracionUtil.urlServidor+"/usuarios/"+usuario._id, usuario)
    }

    public bajaUsuario(){

    }

}
