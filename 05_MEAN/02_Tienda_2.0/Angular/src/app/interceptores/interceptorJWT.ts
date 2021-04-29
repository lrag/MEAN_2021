import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AutenticacionService } from "../modulos/usuarios/servicios/autenticacionService";
import { SessionService } from "../servicios/sessionService";
import { ConfiguracionUtil } from "../util/configuracionUtil";

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
    
    public constructor(private autenticacionService:AutenticacionService,
                       private sessionService:SessionService){
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("==========================================")
        console.log("Interceptor JWT")

        let JWT = this.autenticacionService.getJWT()
        if(JWT){
            console.log("Hay que añadir el token")

            console.log("Comprobando que el token no vaya a caducar...")
            
            let hora = Math.floor(Date.now()/1000)
            let horaExpiracion = this.sessionService.getItem("horaExpiracionJWT")
            
            //Si se ha caducado de verdad
            if( hora > ( horaExpiracion  ) ){
                //navegar a login
                //OMG!
                console.log("El token ya ha caducado!!!")
                //Retiramos el token caducado
                this.sessionService.clear()


                window.location.href = "/"
                return
            }
            
            if( hora > ( horaExpiracion -20  ) ){

                console.log("EL token va a caducar en 20 segundos")
                //Solicitamos un nuevo token...
               
               
                console.log("=======================================")
                console.log("Enviando la peticion para renovar el token")
                let xhr:XMLHttpRequest = new XMLHttpRequest()
                xhr.open("POST", ConfiguracionUtil.urlServidor+"/renovarJWT", false ) //SINCRONO, QUE SE JODA EL CHROME 
                xhr.setRequestHeader("Authorization", `Bearer ${JWT}`)
                xhr.send()
                console.log(xhr.status)
                console.log(xhr.responseText)   
                
                //Machacamos el JWT que hay en el sessionService por el nuevo
                JWT = JSON.parse(xhr.responseText).JWT
                this.sessionService.setItem("JWT",JWT)

                //Calculamos la nueva hora local de expiracion
                let cargamento:any = JSON.parse(atob(JWT.split(".")[1]))

                console.log("====================================")
                console.log(cargamento)
                let horaServidor  = cargamento.iat 
                //10:00:00
                let horaExpiracion = cargamento.exp
                //11:00:00
                let horaNavegador = Math.floor(Date.now()/1000)
                //13:00:00
                let diferenciaHora = horaServidor-horaNavegador
                //10800
                let horaExpiracionJWT = horaExpiracion+diferenciaHora
                //14:00:00
      
                this.sessionService.setItem("horaExpiracionJWT", horaExpiracionJWT)                   

            }




            //En Angular los objetos del tipo HttpRequest son inmutables
            req = req.clone({
                setHeaders : {
                    Authorization : 'Bearer '+JWT
                }
            })
        }

        //Si no invocamos 'next' la petición no se enviará
        return next.handle(req)

        /*
        return new Observable( subscriber => {
            console.log("RESPUESTA INTERCEPTADA")
            next.handle(req)
            .subscribe(
                movida => {
                    console.log(movida),
                    subscriber.next(movida)
                    //subscriber.complete()
                },
                error => {
                    console.log("Error",error)
                    subscriber.error(error)
                    //subscriber.complete()
                }
            )

        })
        */
        

    }

}


