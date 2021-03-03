import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

//Los servicios que se dediquen al 100% a enviar peticiones ajax serán siempre 
//registrados a nivel de la aplicación (en el módulo principal o con 'provided in root')
@Injectable({ providedIn : 'root' })
export class UsuariosService {

    public constructor(private httpClient:HttpClient){
    }

    public listarUsuarios():Observable<any> {
        return this.httpClient.get("https://reqres.in/api/users?delay=3")
    }

}



