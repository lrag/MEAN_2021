//como si fuera un sessionStorage

import { Injectable } from "@angular/core"

@Injectable({providedIn:'root'}) //dirctamente en el compoennte
export class SessionService{
    private items:[]=[] //declaramos e inicalizamos 

    //insertar(objeto)
    public setItem(clave:string, valor:any):void{
        this.items[clave]=valor
    }

    public getItem(clave:string):any{
        return this.items[clave]
    }

    public removeItem(clave:string):void{
        delete this.items[clave]
    }

    public clear():void{
        this.items=[]
    }

    //mostra/buscar

    //eliminar

    //vaciar
}