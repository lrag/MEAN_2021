import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";


@Injectable( { providedIn : 'root' })
export class ProductosService {

    public constructor(private httpClient:HttpClient){
    }

    public listarProductos():Observable<any>{
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/productos")
    }

} 