import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  //mensaje?
  public usuario:Usuario
  

  constructor() { 
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
  }

}
