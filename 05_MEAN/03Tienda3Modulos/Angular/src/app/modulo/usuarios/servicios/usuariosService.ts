import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { ConfiguracionUtil } from "../../../util/configuracionUtil";
import { AutenticacionService } from "./autenticacionService";
//import { ConfiguracionService } from "./configuracionService";
import { SessionService } from "../../../servicios/sessionService";

@Injectable({providedIn:'root'})
export class UsuariosService{
  //  private usuario:Usuario[] = []

    public constructor(//private configuracionService:ConfiguracionService,
                       private httpClient:HttpClient,
                       private sessionService:SessionService  //se cambio autenticacion servicie por dependencia circulares
                        
                        ){

    }
    public comprobarLogin(login:string):Observable<any>{
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/comprobarLogin?login="+login)
    }


    public altaUsuario(usuario:Usuario):Observable<any>{
        //peticion Ajax (observable)
        //return this.httpClient.post("https://localhost:6001/usuarios", usuario)
        // this.httpClient.post('/usuarios',usuario) //ruta absoluta
        return this.httpClient.post(ConfiguracionUtil.urlServidor+'/usuarios',usuario) //ruta relativa
       


    }

     //public borrarDisco(id:Number):void //Esto también está bien
     public bajaUsuario(){
        
            }
        
    

     public modificarUsuario(usuario:Usuario):Observable<any>{
      
     /*  
        //obtenemos la autorizacion para poder modificar
            let opciones={
                headers : {
                    Authorization : "Bearer "+this.sessionService.getItem("JWT") //cabecera necesaria
            }
        };
        return this.httpClient.put(ConfiguracionUtil.urlServidor+'/usuarios/'+usuario._id,usuario, opciones) //ruta relativa
    */
      return this.httpClient.put(ConfiguracionUtil.urlServidor+'/usuarios/'+usuario._id,usuario) //ruta relativa
    }

/*
    //cambios hechos de otra manera
    public buscarUsuario(id:string):Usuario{         //cambios de tipo de datos  string
        for(let d of this.usuario){
            if(d._id == id){
                return JSON.parse(JSON.stringify(d))
            }
        }
        return null
    }
*/
}