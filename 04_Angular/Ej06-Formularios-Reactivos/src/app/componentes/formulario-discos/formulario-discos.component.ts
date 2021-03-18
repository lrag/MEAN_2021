import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Disco } from 'src/app/entidades/disco';
import { DiscosService } from 'src/app/servicios/discos.service';

@Component({
  selector: 'app-formulario-discos',
  templateUrl: './formulario-discos.component.html',
  //providers: [ DiscosService ]  
})
export class FormularioDiscosComponent implements OnInit {

  public formulario:FormGroup

  public mensaje:string
  public error:string

  constructor(private formBuilder:FormBuilder,
              private router:Router,
              private discosService:DiscosService,
              private activatedRoute:ActivatedRoute) { 

    this.formulario = formBuilder.group({
      id     : formBuilder.control('', [ Validators.required ]),
      titulo : formBuilder.control(null, [ Validators.required ]),
      grupo  : formBuilder.control('', [ Validators.required ]),
      year   : formBuilder.control('', [ Validators.required, Validators.pattern('^[0-9]*$') ]),
      genero : formBuilder.control(''),
      notas  : formBuilder.control('')    
    })

    let idDiscoSel = activatedRoute.snapshot.params.id
    if(idDiscoSel){
      this.formulario.setValue(discosService.buscarDisco(idDiscoSel))
    } 

  }

  ngOnInit(): void {
  }

  public insertarDisco():void{
    //Validar...
    /*
    if(!this.disco.titulo || this.disco.titulo.trim()==''){
      this.error = "El título es obligatorio"
      return
    }
    */
    
    this.formulario.markAllAsTouched()

    if(this.formulario.invalid){
      return
    }

    this.discosService.insertarDisco(this.formulario.value)
    //navegar al listado
    this.router.navigateByUrl("/listadoDiscos")
  }

  public modificarDisco():void{
    //Validar...
    /*
    if(!this.disco.titulo || this.disco.titulo.trim()==''){
      this.error = "El título es obligatorio"
      return
    }
    */

    this.discosService.modificarDisco(this.formulario.value)
    //navegar al listado
    this.router.navigateByUrl("/listadoDiscos")    
  }

  public borrarDisco():void{
    this.discosService.borrarDisco(this.formulario.value)
    //navegar al listado
    this.router.navigateByUrl("/listadoDiscos")    
  }

  public vaciarFormulario():void{
    this.formulario.setValue(new Disco())
  }

}
