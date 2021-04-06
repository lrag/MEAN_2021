import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../entidades/usuario';

import { AutenticacionService } from '../../servicios/autenticacionService';

@Component({
  selector: 'app-perfil-usuarios',
  templateUrl: './perfil-usuarios.component.html'
})
export class PerfilUsuariosComponent implements OnInit {

  public formulario:FormGroup //aqui esta con undefined

  public mensaje:string
  public mensajeError:string
  
  constructor(private formBuilder:FormBuilder,
             //private sessionService:SessionService,
             //private router:Router,
             //private usuariosService:UsuariosService,
            // private activatedRoute:ActivatedRoute,
             private autenticacionService:AutenticacionService) {

  let usuario:Usuario = autenticacionService.getUsuario()
    //let usuario=sessionService.getItem('usuario')
    this.formulario = formBuilder.group({
      _id         : formBuilder.control(usuario._id), //no se pide en el formualriui pero los Usuarios lo necesitan porque se genera en la funcion
      nombre      : formBuilder.control(usuario.nombre, [ Validators.required ]),
      login       : formBuilder.control(usuario.login),
      pw          : formBuilder.control(usuario.pw, [ Validators.required, Validators.minLength(5) ]),
      idioma      : formBuilder.control(usuario.idioma),
      correoE     : formBuilder.control(usuario.correoE,[ Validators.required,Validators.email ]),
      telefono    : formBuilder.control(usuario.telefono),
      direccion   : formBuilder.control(usuario.direccion,[ Validators.required])

    })

 /*
 segun el otro ejemplo   
    this.formulario.setValue(usuario)

    let idUsuarioSel = activatedRoute.snapshot.params.id
    if(idUsuarioSel){
      this.formulario.setValue(usuariosService.buscarUsuario(idUsuarioSel))
    } 
*/
   }

  ngOnInit(): void {
  }

  public guardarUsuarios():void{

    this.formulario.markAllAsTouched()
    if(this.formulario.invalid){
      return
    }
    

    this.autenticacionService.modificarUsuario(this.formulario.value)
          .subscribe(
            ()=>{this.mensaje="El perfil se modifco correctamente...Bien "}, //agregar jQuery de Efectyo de tiempodesvance
            ()=> {this.mensajeError="Error al modifcari tu perfil!!"}
          )
  }

}
/*
  public borrarUsuario():void{
    this.usuariosService.bajaUsuario(this.formulario.value)
    //navegar al listado
    this.router.navigateByUrl("/usuarios")    
  }

  public vaciarFormulario():void{
    this.formulario.setValue(new Usuario())
  }
*/

