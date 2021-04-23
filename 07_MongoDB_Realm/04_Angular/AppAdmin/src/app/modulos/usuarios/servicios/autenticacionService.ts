import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { UsuariosService } from "./usuariosService";

@Injectable({ providedIn : 'root' })
export class AutenticacionService {

    public constructor(private usuariosService:UsuariosService){
    }

    public getUsuario():Usuario{
        return 
    }

    public login(usuario:Usuario):Observable<any>{
        return new Observable( subscriber => {
        })
    }

    public logout():void{
    }

    public modificarUsuario(usuario:Usuario):Observable<any>{
        return new Observable( subscriber => {
        })
    }

}