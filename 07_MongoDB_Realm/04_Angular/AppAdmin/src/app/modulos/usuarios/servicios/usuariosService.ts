import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { SessionService } from "../../../servicios/sessionService";

@Injectable( { providedIn : 'root' })
export class UsuariosService {

    public constructor(private sessionService:SessionService){
    }

    //PAra que los administradores registren a empleados
    public altaUsuario(usuario:Usuario){



        
    }

    //Para que un usuario modifique su perfil
    public modificarUsuario(usuario:Usuario){
    }

    //Para que los administradores den de baja a un empleado
    public bajaUsuario(){
    }

}
