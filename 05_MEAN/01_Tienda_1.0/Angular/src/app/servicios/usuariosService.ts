import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";


@Injectable( { providedIn : 'root' })
export class UsuariosService {

    public constructor(private httpClient:HttpClient){
    }

    public altaUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.post("https://localhost:6001/usuarios", usuario)
    }

    public modificarUsuario(){

    }

    public bajaUsuario(){

    }

}
