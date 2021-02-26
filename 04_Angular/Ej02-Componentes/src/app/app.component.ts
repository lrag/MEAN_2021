import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  //Si no vamos a usar el css particular del componente podemos borrarlo
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public constructor(){
    console.log("Creando una instancia de AppComponent")
  }

}
