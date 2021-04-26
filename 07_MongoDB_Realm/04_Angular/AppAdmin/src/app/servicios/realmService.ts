//En la carpeta 'node-modules' del proyecto angular:
//npm install realm-web
import { Injectable } from '@angular/core'
import { App } from 'realm-web'
import { AutenticacionService } from '../modulos/usuarios/servicios/autenticacionService'
import { ConfiguracionUtil } from '../util/configuracionUtil'

@Injectable( { providedIn : 'root' })
export class RealmService {

    private app:App     //undefined
    private esquema:any //undefined
    
    public constructor(){
    } 

    public getApp(){
        //Inicialización perezosa
        if(!this.app){
            this.app = new App({ id : ConfiguracionUtil.realmAppId })
        }
        return this.app
    }

    //El esquema lo van a utilizar los servicios que hagan consultas
    //Los controladores NO!
    public getEsquema(){
        //El esquema lo obtenemos a partir del usuario autenticado
        if(!this.esquema){
            if(!this.app){
                throw new Error("Pero pa ke yamas a getEsquema si no as kreado el objeto App???")
                return
            }

            let usuario = this.app.currentUser

            console.log("realmService.getEsquema. Obteniendo el esquema del usuario:", usuario)

            if(!usuario){
                throw new Error("Pero pa ke yamas a getEsquema si si entodavia no te as enlogao???")
                return
            }

            this.esquema = this.app.currentUser.mongoClient("mongodb-atlas").db(ConfiguracionUtil.nombreEsquema)
        }
        return this.esquema
    }
    
}

