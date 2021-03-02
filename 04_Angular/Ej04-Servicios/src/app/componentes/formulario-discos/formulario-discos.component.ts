import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disco } from 'src/app/entidades/disco';
import { DiscosService } from 'src/app/servicios/discos.service';

@Component({
  selector: 'app-formulario-discos',
  templateUrl: './formulario-discos.component.html',

  //providers: [ DiscosService ]  

})
export class FormularioDiscosComponent implements OnInit {

  public mensaje:string
  public error:string

  public disco:Disco //undefined

  constructor(private router:Router,
              private discosService:DiscosService) { 
    console.log("Creando una instancia de FormularioDiscosComponent")
    this.disco = new Disco()
  }

  ngOnInit(): void {
  }

  public insertarDisco():void{
    //Validar...
    if(!this.disco.titulo || this.disco.titulo.trim()==''){
      this.error = "El título es obligatorio"
      return
    }

    this.discosService.insertarDisco(this.disco)
    //navegar al listado
    this.router.navigateByUrl("/listadoDiscos")
  }

  public modificarDisco():void{

  }

  public borrarDisco():void{

  }

  public vaciarFormulario():void{

  }


}
