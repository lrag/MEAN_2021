import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { Pedido } from "../entidades/pedido";


@Injectable({ providedIn : 'root' })
export class ComprasService {

    public constructor(private httpClient:HttpClient){
        console.log("Creando ComprasService")
    }

    public comprar(cesta:Pedido):Observable<any>{
        return this.httpClient.post(ConfiguracionUtil.urlServidor+"/ordenes_compra", cesta)
    }

}
