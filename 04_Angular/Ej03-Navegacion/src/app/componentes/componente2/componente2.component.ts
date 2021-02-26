import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html'
})
export class Componente2Component implements OnInit {

  public dato1:string
  public dato2:string

  constructor() { 

  }

  ngOnInit(): void {
  }

}
