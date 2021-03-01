import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';

@Component({
  selector: 'app-formulario-discos',
  templateUrl: './formulario-discos.component.html'
})
export class FormularioDiscosComponent implements OnInit {

  public mensaje:string
  public error:string

  public disco:Disco //undefined

  constructor() { }

  ngOnInit(): void {
  }

  public insertarDisco():void{
    
  }

  public modificarDisco():void{

  }

  public borrarDisco():void{

  }

  public vaciarFormulario():void{

  }


}
