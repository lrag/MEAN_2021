import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/modulo/usuarios/servicios/autenticacionService';

@Component({
  selector: 'app-maquetacion-tienda',
  templateUrl: './maquetacion-tienda.component.html'
})
export class MaquetacionTiendaComponent implements OnInit {

  constructor(private autenticacionService:AutenticacionService,
            private router:Router) { 
             if(!autenticacionService.getUsuario()){
               router.navigateByUrl('/usuarios/login/')
             } 
  }

  ngOnInit(): void {
  }

}
