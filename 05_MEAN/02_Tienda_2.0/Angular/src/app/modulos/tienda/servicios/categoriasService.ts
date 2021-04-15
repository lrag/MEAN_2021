import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { CriterioBusquedaProducto } from "../entidades/criterioBusquedaProducto";

@Injectable( { providedIn : 'root' })
export class CategoriasService {

    constructor(private httpClient:HttpClient){
    }

    public listarCategorias():Observable<any>{
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/categorias")
    }

}