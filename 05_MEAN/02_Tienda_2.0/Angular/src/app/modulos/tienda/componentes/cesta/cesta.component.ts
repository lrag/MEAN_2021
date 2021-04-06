import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html'
})
export class CestaComponent implements OnInit {

  public cesta:Pedido

  constructor(private cestaService:CestaService) { 
    this.cesta = cestaService.getCesta()
  }

  ngOnInit(): void {
  }

  public vaciarCesta():void{
    this.cesta.vaciarCesta()
  }

}
