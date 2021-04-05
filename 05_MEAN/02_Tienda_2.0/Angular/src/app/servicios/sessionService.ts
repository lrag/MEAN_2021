import { Injectable } from "@angular/core"

@Injectable( { providedIn : 'root' } )
export class SessionService {

    //private items:[] = []

    public setItem(clave:string, valor:any, persistente:boolean=false):void{
        //this.items[clave] = valor
        if(persistente){
            localStorage.setItem(clave,JSON.stringify(valor))
        } else {
            sessionStorage.setItem(clave, JSON.stringify(valor))
        }
    }

    public getItem(clave:string):any{
        //return this.items[clave]
        return JSON.parse(sessionStorage.getItem(clave))

        
    }

    public removeItem(clave:string):void{
        //delete this.items[clave]
        sessionStorage.removeItem(clave)
    }

    public clear():void{
        //this.items = []
        sessionStorage.clear()
    }
    
}



