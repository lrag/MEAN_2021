import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public usuario:Usuario
  public mensaje:string

  constructor() { 
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
  }

  public entrar():void{

  }

}
