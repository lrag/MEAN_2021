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

    /*
    public getUsuario():Usuario{
        let usuarioRealm:any =  this.realmService.getApp().currentUser

        let usuario:Usuario = new Usuario()
        usuario.id        = usuarioRealm.id
        usuario.correoE   = usuarioRealm.profile.data.email
        usuario.nombre    = usuarioRealm.customData.nombre
        usuario.direccion = usuarioRealm.customData.direccion
        usuario.telefono  = usuarioRealm.customData.telefono
        usuario.rol       = usuarioRealm.customData.rol

        return usuario
    }
    */

    public getUsuario():any {
        return this.realmService.getApp().currentUser
    }

    public login(usuario:Usuario){

        return new Promise( async (resolve, reject) => {
            try {
                let app = this.realmService.getApp()
                let credenciales = Credentials.emailPassword(usuario.correoE, usuario.pw)
                await app.logIn(credenciales)
                
                //Llamamos por primera vez a get esquema aunque no queramos ejecutar una consulta
                //para asegurarnos de que el esquema queda asociado al usuario atuenticado
                //(semi ñapa)
                this.realmService.getEsquema()
                resolve("( (  |")

            } catch( error) {
                console.log(error)
                reject({ mensaje : 'Credenciales incorrectas' })              
            }  
        })

    }

    public logout():Promise<any>{
        return this.realmService.getApp().currentUser.logOut()
    }

    public modificarUsuario(usuario:Usuario):Observable<any>{
        return new Observable( subscriber => {
        })
    }

}