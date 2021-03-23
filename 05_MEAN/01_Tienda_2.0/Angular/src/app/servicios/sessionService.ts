import { Injectable } from "@angular/core"

@Injectable( { providedIn : 'root' } )
export class SessionService {

    private items:[] = []

    public setItem(clave:string, valor:any):void{
        this.items[clave] = valor
    }

    public getItem(clave:string):any{
        return this.items[clave]
    }

    public removeItem(clave:string):void{
        delete this.items[clave]
    }

    public clear():void{
        this.items = []
    }
    
}



