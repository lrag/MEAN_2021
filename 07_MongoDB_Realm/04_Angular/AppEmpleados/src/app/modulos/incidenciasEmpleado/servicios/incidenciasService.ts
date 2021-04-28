import { Injectable } from "@angular/core";
import { RealmService } from "src/app/servicios/realmService";
import { AutenticacionService } from "../../usuarios/servicios/autenticacionService";
import { Incidencia } from "../entidades/incidencia";


@Injectable( { providedIn : 'root' })
export class IncidenciasService {

    public constructor(private realService:RealmService,
                       private autenticacionService:AutenticacionService){
    }

    public modificar(incidencia:Incidencia):Promise<any>{
        return this.realService.getEsquema()
            .collection("incidencias")
            .findOneAndUpdate( { _id : incidencia._id },
            {
                $set : {
                    //nombre    : incidencia.nombre,
                    //fecha     : incidencia.fecha,
                    //prioridad : incidencia.prioridad,
                    //usuario   : incidencia.usuario,
                    estado      : incidencia.estado,
                }
            })
    }

    public listar():Promise<any>{
        let usuario = this.autenticacionService.getUsuario()
        return this.realService.getEsquema()
            .collection("incidencias")
            .find( { "usuario.idUsuario" : usuario.id } )
    }

    public buscar(id:string):Promise<any>{
        return this.realService.getEsquema()
            .collection("incidencias")
            .findOne({ _id : id })
    }

}
