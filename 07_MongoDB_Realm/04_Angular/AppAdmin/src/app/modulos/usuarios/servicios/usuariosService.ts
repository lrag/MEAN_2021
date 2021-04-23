import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { SessionService } from "../../../servicios/sessionService";

@Injectable( { providedIn : 'root' })
export class UsuariosService {

    public constructor(private sessionService:SessionService){
    }


    public altaUsuario(usuario:Usuario){
    }

    public modificarUsuario(usuario:Usuario){
    }

    public bajaUsuario(){
    }

}
