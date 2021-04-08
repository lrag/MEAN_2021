import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Persona } from "../entidades/persona";

@Injectable( { providedIn : 'root' })
export class ServicioSubject {

    //private subject:Subject<Persona>
    private subject:BehaviorSubject<Persona>

    public constructor(){
        //this.subject = new Subject()
        this.subject = new BehaviorSubject(new Persona("-"))
    }

    public getPersona():Subject<Persona>{
        return this.subject;
    }

    public setNombre(nombre:string):void{
        let persona = new Persona(nombre)
        this.subject.next(persona) 
    }

}