import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/entidades/persona';
import { ServicioMemoria } from 'src/app/servicios/servicioMemoria';
import { ServicioSubject } from 'src/app/servicios/servicioSubject';

@Component({
  selector: 'app-subscriptor',
  templateUrl: './subscriptor.component.html'
})
export class SubscriptorComponent implements OnInit {

  public personaMemoria:Persona
  public personaSubject:Persona = new Persona("aaa") //Este no llega a salir porque nada mas subscribirnos nos entregan una persona(BehaviorSubject)

  constructor(private servicioMemoria:ServicioMemoria,
              private servicioSubject:ServicioSubject) { 
    this.personaMemoria = servicioMemoria.getPersona()

    //No nos dan una persona. Nos dan un subject que entregará un stream de personas
    servicioSubject
      .getPersona()
      .subscribe(
        persona => {
          console.log("Recibida una nueva persona")
          this.personaSubject = persona
        }
      )

  }

  ngOnInit(): void {
  }

}
