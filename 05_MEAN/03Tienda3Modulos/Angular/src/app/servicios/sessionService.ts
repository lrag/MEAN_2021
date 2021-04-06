//como si fuera un sessionStorage

import { Injectable } from "@angular/core"

@Injectable({providedIn:'root'}) //dirctamente en el compoennte
export class SessionService{
    private items:[]=[] //declaramos e inicalizamos 

    //insertar(objeto)
    public setItem(clave:string, valor:any, persistente:boolean=false):void{
      //  this.items[clave]=valor
        //sessionStorage.setItem(clave,valor) solo cadenas
      if(persistente){ //con esto condicionamos que lo busque en local o en el sesion
          localStorage.setItem(clave,JSON.stringify(valor))
      }else{
        sessionStorage.setItem(clave,JSON.stringify(valor)) //cuando es objetos recibidos
      }
        
    }

    public getItem(clave:string):any{
      //return this.items[clave]
      let item = sessionStorage.getItem(clave)
      if(!item){
          item = localStorage.getItem(clave)
      }
      return JSON.parse(item)
    }

    public removeItem(clave:string):void{
       // delete this.items[clave]
       sessionStorage.removeItem(clave)
    }

    public clear():void{
        //this.items=[]
        sessionStorage.clear()

    }

    //mostra/buscar

    //eliminar

    //vaciar
}