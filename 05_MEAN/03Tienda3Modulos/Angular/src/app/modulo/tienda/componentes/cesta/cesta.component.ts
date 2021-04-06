import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../entidades/pedido';
import { CestaService } from '../../servicios/cestaService';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  //styleUrls: []
})
export class CestaComponent implements OnInit {

  public cesta:Pedido
  constructor(private cestaService:CestaService) {
    
    this.cesta=cestaService.getCesta() //para obtener la cesta
   }

  ngOnInit(): void {
  }

}
