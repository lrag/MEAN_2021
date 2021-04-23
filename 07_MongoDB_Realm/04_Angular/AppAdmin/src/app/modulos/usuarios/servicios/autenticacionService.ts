import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RealmService } from "src/app/servicios/realmService";
import { Usuario } from "../entidades/usuario";
import { UsuariosService } from "./usuariosService";

import { Credentials } from "realm-web"

@Injectable({ providedIn : 'root' })
export class AutenticacionService {

    public constructor(private usuariosService:UsuariosService,
                       private realmService:RealmService){
    }

    public getUsuario():Usuario{
        return 
    }

    public login(usuario:Usuario){

        return new Promise( async (resolve, reject) => {
            try {
                let app = this.realmService.getApp()
                let credenciales = Credentials.emailPassword(usuario.correoE, usuario.pw)
                await app.logIn(credenciales)
                resolve("( (  |")
            } catch( error) {
                console.log(error)
                reject()                
            }  
        })

    }

    public logout():void{
    }

    public modificarUsuario(usuario:Usuario):Observable<any>{
        return new Observable( subscriber => {
        })
    }

}