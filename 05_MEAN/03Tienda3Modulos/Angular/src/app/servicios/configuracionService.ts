import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class ConfiguracionService{
    public urlSrvidor:string ='https://localhost:6001'
}

//creamos el objeto
//let cfgS=new ConfiguracionService()  no es necesario crear un objeto

//console.log(":"+ConfiguracionService.urlSrvidor)
//console.log(cfgS.urlSrvidor) //no es necesario si es estaticop

//trsnpilamos para crear el js
