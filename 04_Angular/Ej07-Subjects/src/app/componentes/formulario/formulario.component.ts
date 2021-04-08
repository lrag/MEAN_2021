import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  public dato:string

  constructor() { }

  ngOnInit(): void {
  }

  public guardar():void{
    console.log(this.dato)
  }

}
