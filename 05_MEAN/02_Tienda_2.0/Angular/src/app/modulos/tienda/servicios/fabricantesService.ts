import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { CriterioBusquedaProducto } from "../entidades/criterioBusquedaProducto";

@Injectable( { providedIn : 'root' })
export class FabricantesService {

    constructor(private httpClient:HttpClient){
    }

    public listarFabricantes():Observable<any>{
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/fabricantes")
    }

}