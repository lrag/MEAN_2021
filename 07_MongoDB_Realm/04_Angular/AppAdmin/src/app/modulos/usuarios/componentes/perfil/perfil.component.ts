import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modulos/usuarios/entidades/usuario';
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/modulos/usuarios/servicios/usuariosService';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public formulario:FormGroup

  public mensaje:string
  public mensajeError:string

  constructor(private formBuilder:FormBuilder,
              private autenticationService:AutenticacionService) {

    let usuario:Usuario = autenticationService.getUsuario()
    
    this.formulario = formBuilder.group({
      id       : formBuilder.control(usuario.id),
      nombre    : formBuilder.control(usuario.nombre,    [ Validators.required ]),
      pw        : formBuilder.control(usuario.pw,        [ Validators.required, Validators.minLength(10) ]),
      telefono  : formBuilder.control(usuario.telefono,  [ Validators.required ]),    
      direccion : formBuilder.control(usuario.direccion, [ Validators.required ]),    
    })

  }

  ngOnInit(): void {
  }

  public guardar():void{

    this.formulario.markAllAsTouched()
    if(this.formulario.invalid){
      return
    }

    this.autenticationService.modificarUsuario(this.formulario.value)
    .subscribe(
      () => { this.mensaje = 'El perfil se modificó correctamente' },
      () => { this.mensajeError = 'Hubo un problema en el servidor' }
    )

  }

}
