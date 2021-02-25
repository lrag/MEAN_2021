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

  //Declaramos un array aqui para los discos. No es el lugar correcto
  public discos:Disco[] = []
  
  //Esta propiedad esta unida al estilo de una etiqueta de la plantilla
  public estilo:string = "normal"


  public insertarDisco():void{
    console.log("Insertar disco:",this.disco)
    this.discos.push(this.disco)
    console.log(this.discos)
    this.vaciarFormulario()
  }

  public vaciarFormulario():void{
    console.log("Vaciando el formulario...")
    //No necesitamos buscar las cajas de texto y vaciarlas, pero podríamos hacerlo en caso de tener el día tonto
    
    //Como el formuario está unido al disco si modificamos las propiedades del objeto
    //el cambio se ve en el formulario
    
    //Podemos hacerlo propiedad a propiedad...
    //this.disco.id = null
    //this.disco.titulo = ""
    //this.disco.grupo = ""
    //this.disco.year = null

    //Podemos poner un disco nuevo y lo lo hacemos del tirón
    this.disco = new Disco()
  }

  //////////////////////////////////////////
  public estiloNormal():void{
    this.estilo = "normal"
  }

  public estiloError():void{
    this.estilo = "error"
  }


}

