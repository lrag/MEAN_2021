import { Injectable } from "@angular/core";
import { RealmService } from "src/app/servicios/realmService";
import { Incidencia } from "../entidades/incidencia";


@Injectable( { providedIn : 'root' })
export class IncidenciasService {

    public constructor(private realService:RealmService){
    }

    public insertar(incidencia:Incidencia):Promise<any>{
        delete incidencia._id

        console.log(JSON.stringify(incidencia))


        return this.realService.getEsquema()
            .collection("incidencias")
            .insertOne(incidencia)
    }

    public modificar(incidencia:Incidencia):Promise<any>{
        return this.realService.getEsquema()
            .collection("incidencias")
            .findOneAndUpdate( { _id : incidencia._id },
            {
                $set : {
                    nombre    : incidencia.nombre,
                    fecha     : incidencia.fecha,
                    prioridad : incidencia.prioridad,
                    usuario   : incidencia.usuario,
                    estado    : incidencia.estado,
                }
            })
    }

    public listar():Promise<any>{
        return this.realService.getEsquema()
            .collection("incidencias")
            .find()
    }

    public buscar(id:string):Promise<any>{
        return this.realService.getEsquema()
            .collection("incidencias")
            .findOne({ _id : id })
    }

    public borrar(id:string):Promise<any>{
        return this.realService.getEsquema()
            .collection("incidencias")
            .deleteOne({ _id : id })
    }

}
