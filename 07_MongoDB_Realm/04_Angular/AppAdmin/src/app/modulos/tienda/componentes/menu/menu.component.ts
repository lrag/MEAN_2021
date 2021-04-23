import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/modulos/usuarios/servicios/autenticacionService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public constructor(private router:Router,
                     private autenticacionService:AutenticacionService){
    console.log("Creando una instancia de MenuComponent")
  }

  ngOnInit(): void {
  }

  public logout():void{
    this.autenticacionService.logout()
    this.router.navigateByUrl("/usuarios/login")
  }

}
