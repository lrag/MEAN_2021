import { Injectable } from "@angular/core";
import { Persona } from "../entidades/persona";


@Injectable( { providedIn : 'root' } )
export class ServicioMemoria {

    private persona:Persona = new Persona()
    
    public getPersona():Persona{
        return this.persona
    }

    public setNombre(nombre:string):void{
        this.persona.nombre = nombre
    }

}