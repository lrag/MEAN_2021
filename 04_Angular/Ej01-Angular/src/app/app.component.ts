import { Component } from '@angular/core';
import { Disco } from './entidades/disco';

//Decorador
//Albergan configuración
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //Se puede definir aqui la plantilla, ideal si eres una mala persona
  //template : `<marquee><h1>Igual que en el Framework3000</h1></marquee>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mensaje:string = "Bo que pa que pa que pacha"
  public numero1:number = 10
  public numero2:number = 20

  //Asociaremos las cajas de texto del formulario a las propiedades de este objeto:
  //Nos aseguramos de que la propiedad tenga valor aqui o en el constructor
  public disco:Disco = new Disco()
  
  public insertarDisco():void{
    console.log("Insertar disco:",this.disco)
  }

}

