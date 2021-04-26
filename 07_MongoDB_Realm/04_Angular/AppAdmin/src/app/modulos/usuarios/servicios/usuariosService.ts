import { App } from "realm-web";
import { Credentials } from "realm-web";
import { Injectable } from "@angular/core";
import { Usuario } from "../entidades/usuario";
import { RealmService } from "src/app/servicios/realmService";

@Injectable( { providedIn : 'root' })
export class UsuariosService {

    public constructor(private realmService:RealmService){
    }

    //Para que los administradores registren a empleados
    public altaUsuario(usuario:Usuario){

      return new Promise(async (resolve, reject) => {
        try {

            let app:App = this.realmService.getApp()
 
            //Pasos:
            //-registrar el usuario
            //-añadir su información adicional a 'custom user data'
            await app.emailPasswordAuth.registerUser(usuario.correoE, usuario.pw)
            console.log("Usuario registrado")

            console.log("CurrentUSer (antes del login)", app.currentUser)
            
            //Para poder añadir el custom user data necesitamos el id del nuevo usuario
            //asi que hacemos un login 
            let credenciales = Credentials.emailPassword(usuario.correoE, usuario.pw)
            let usuarioAux = await app.logIn(credenciales)
            
            let customData = {
              nombre    : usuario.nombre,
              direccion : usuario.direccion,
              telefono  : usuario.telefono,
              idUsuario : usuarioAux.id, //El id del usuario registrado
              rol       : "EMPLEADO"
            }     

            console.log("CurrentUSer (antes del insert one)", app.currentUser)
            

            this.realmService.getEsquema()
              .collection("usuarios")
              .insertOne(customData)
        
            console.log("Nuevo custom data:", customData)

            //Hacemos logout del usuario recien creado
            await usuarioAux.logOut()

            resolve("")

        } catch (error) {
            console.log(error)
            reject(error)
        }
      })        
    }

    //Para que un usuario modifique su perfil
    public modificarUsuario(usuario:Usuario){
    }

    //Para que los administradores den de baja a un empleado
    public bajaUsuario(){
    }

}
