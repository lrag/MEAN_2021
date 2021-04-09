import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/modulo/usuarios/servicios/autenticacionService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
 
})
export class MenuComponent implements OnInit {

  public constructor(private router:Router,
                    private autenticacionService:AutenticacionService) { //para que llame realmente el componente
    console.log("Creando Menu Components de Tienda...");
  }

  ngOnInit(): void {
  }

  public logout():void{
    /*
      sessionStorage.removeItem('JWT')
      sessionStorage.removeItem('usuario')
      this.router.navigateByUrl('/usuarios/login')
    */
      this.autenticacionService.logout()

      this.router.navigateByUrl("/usuarios/login")
  }
}
