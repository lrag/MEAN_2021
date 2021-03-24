import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AutenticacionService } from "../servicios/autenticacionService";

//Los interceptores deben de estar marcados con @Injectable y se registran EN EL MÓDULO
//providers : [{
//    provide : HTTP_INTERCEPTORS,
//    useClass : InterceptorJWT,
//    multi : true
//}]
//Y
//Deben implementar la interfaz HttpInterceptor

@Injectable()
export class InterceptorJWT implements HttpInterceptor {
    
    public constructor(private autenticacionService:AutenticacionService){
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("==========================================")
        console.log("Interceptor JWT")

        let JWT = this.autenticacionService.getJWT()
        if(JWT){
            console.log("AÑADIR EL TOKEN!!!!!")

            //En Angular los objetos del tipo HttpRequest son inmutables
            req = req.clone({
                setHeaders : {
                    Authorization : 'Bearer '+JWT
                }
            })
        }

        //Si no invocamos 'next' la petición no se enviará
        return next.handle(req)

    }

}


