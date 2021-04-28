import { App } from "realm-web";
import { Credentials } from "realm-web";
import { Injectable } from "@angular/core";
import { Usuario } from "../entidades/usuario";
import { RealmService } from "src/app/servicios/realmService";
import { AutenticacionService } from "./autenticacionService";

@Injectable( { providedIn : 'root' })
export class UsuariosService {

  public constructor(private realmService:RealmService){
  }

  //Para que los administradores registren a empleados
  public altaUsuario(usuario:Usuario){

    return new Promise(async (resolve, reject) => {
      try {
        let app:App = this.realmService.getApp()

        //Como luego haremos el login para averiguar el id del nuevo usuario
        //nos quedamos con una referencia del usuario administrador
        let usuarioAdmin = app.currentUser

        //Pasos:
        //-registrar el usuario
        //-añadir su información adicional a 'custom user data'
        await app.emailPasswordAuth.registerUser(usuario.correoE, usuario.pw)
        
        //Para poder añadir el custom user data necesitamos el id del nuevo usuario
        //asi que hacemos un login 
        let credenciales = Credentials.emailPassword(usuario.correoE, usuario.pw)
        let usuarioAux = await app.logIn(credenciales)

        let customData = {
          email     : usuario.correoE,
          nombre    : usuario.nombre,
          direccion : usuario.direccion,
          telefono  : usuario.telefono,
          idUsuario : usuarioAux.id, //El id del usuario registrado
          rol       : "EMPLEADO"
        }     

        /*
        //Con las reglas que tenemos en la colección 'usuarios' esto es aceptablemente seguro
        //poque los que no tienen el rol "ADMIN" no pueden insertar en la coleccion
        //hay que estar seguro de que esta consulta se hace en nombre de un administrador
        this.realmService.getEsquema()
          .collection("usuarios")
          .insertOne(customData)
        */

        /*  
        //Tambien podemos hacerlo en una funcion Realm en la que el rol siempre será 'EMPLEADO'
        exports = function(customData){

          return new Promise( async (resolve,reject) => {
            //No hace falta porque hemos puesto una expresión al definir la función
            //if(user.custom_data.rol != "ADMIN"){
            //  reject({ mensaje : "Solo los administradores pueden invocar esta función"})
            //}  
            var usuarios = context.services.get("mongodb-atlas").db("incidencias").collection("usuarios"); 
            if(!customData.idUsuario){
              reject({ mensaje : "Es necesario el id del usuario" })
              return
            }    
            //Por si intentan hacerse los graciosos...
            customData.rol = "EMPLEADO"
            await usuarios.insertOne(customData)    
            resolve({ mensaje :"OK"})
          })
        };  
        */        
        //Si dejamos esto llamamos a la función en nombre del empleado!
        //this.autenticacionService.getUsuario().functions.altaEmpleado(customData)
        await usuarioAdmin.functions.altaEmpleado(customData)
    
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

  //Para que los administradores listen a los empleados
  public listarUsuarios(){
    return this.realmService.getEsquema().collection("usuarios")
      .find({ rol : 'EMPLEADO' })
      //.find()
  }

}
