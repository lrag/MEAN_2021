import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/modulo/usuarios/servicios/usuariosService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html' 
})
export class RegistroComponent implements OnInit {

  //mesnaje?
  public errorLoginRepetido
  public usuario:Usuario
  public confirmacionPw:string
 

  constructor(private router:Router,
              private SessionService:SessionService,
              private usuariosService:UsuariosService) { 
    this.usuario=new Usuario()
  }

  ngOnInit(): void {
  }

    public siguiente():void{
      //se navega con datos inyectados
      //this.router.navigateByUrl("/login/aceptacion") //con ryuta absoluta
      //guarda el usario
      //navega 
      //los guadamos en el sesionStorage

      this.SessionService.setItem("usuario",this.usuario)
     // sessionStorage.setItem("usuario", JSON.stringify(this.usuario)) //
      this.router.navigateByUrl("/usuarios/aceptacion")
    } 

    private idTimer

    public programarTemporizador():void{
      console.log(this.usuario.login) ///es ineteractiva pero el uso 
      
      //hacerlo con tenporizadores
      if(this.idTimer){
        clearTimeout(this.idTimer)//limpia el temproizador 
      }
      this.idTimer= setTimeout(this.comprobarLogin.bind(this), 250) //para saber cuandta veces esta montando los hilos, se leagrega bind

    }

    public comprobarLogin():void{
      console.log("===========================")
      console.log(this)

      if(this.usuario.login.length < 5){
        console.log("Comprobando el Login cuantificando la cantidad de carcateres")
        return
      }
     
      this.usuariosService.comprobarLogin(this.usuario.login)
        .subscribe(
          data=>{
            if(data.existe){
              this.errorLoginRepetido="Existe un usuario con este Login"
            }else{
              this.errorLoginRepetido = null
            }
          },
            error => console.log(error)
        )
    }

}
