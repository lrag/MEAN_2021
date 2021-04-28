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

  //Para que un usuario modifique su perfil
  public modificarUsuario(usuario:Usuario){
  }

}
