import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private discosService:DiscosService,
              private activatedRoute:ActivatedRoute) { 
    console.log("Creando una instancia de FormularioDiscosComponent")
    
    let idDiscoSel = activatedRoute.snapshot.params.id
    if(idDiscoSel){
      this.disco = discosService.buscarDisco(idDiscoSel)
    } else {
      this.disco = new Disco()
    }

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
    //Validar...
    if(!this.disco.titulo || this.disco.titulo.trim()==''){
      this.error = "El título es obligatorio"
      return
    }
    this.discosService.modificarDisco(this.disco)
    //navegar al listado
    this.router.navigateByUrl("/listadoDiscos")    
  }

  public borrarDisco():void{
    this.discosService.borrarDisco(this.disco)
    //navegar al listado
    this.router.navigateByUrl("/listadoDiscos")    
  }

  public vaciarFormulario():void{
    this.disco = new Disco()
  }


}
