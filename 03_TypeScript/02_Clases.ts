
////////////
// CLASES //
////////////

//Las clases on los moldes que se utilizan para crear los objetos

//Identidad/estado  : datos
//Funcionalidad     : qué hace

class CuentaBancaria {

    //Identidad
    //Atributos/campos/variables de clase/variables miembro
    IBAN     : string
    banco    : number
    sucursal : number
    dc       : number
    libreta  : number

    //Funcionalidad
    //Dentro de una clase no se utiliza la palabra reservada 'function'
    toString():string{
        //Pra acceder a un componente de la clase dentro de una de sus funciones
        //hay que utilizar 'this'
        return this.IBAN + this.banco + this.sucursal + this.dc + this.libreta
    }

}

//Instanciando un objeto

//Sin usar el tipo:
//let cb1 = new CuentaBancaria()
//
//Usando el tipo (una vez creada una clase tenemos un nuevo tipo de variables):
let cb1:CuentaBancaria = new CuentaBancaria()
cb1.IBAN = "ABCD"
//cb1.IBAN = 1234
cb1.banco = 1234
//cb1.banco = "ABCD"
cb1.sucursal = 5678
cb1.dc = 90
cb1.libreta = 1234567890
//cb1.tocoto = 100

//
//Contructores
//
//En typescript podemos tener un constructor (y solo uno)
//No hay sobrecarga de constructores
//El constructor debe llamarse 'constructor'
//El constructor no devuelve nada, pero no es 'void'
//Todas las clases tienen constructor, aunque sea implícitamente

class Libro {

    ISBN   : string
    autor  : string
    titulo : string

    //En el constructor colocamos el código necesario para inicializar el objeto
    
    constructor(ISBN:string, autor:string, titulo:string){
        console.log("Creando un libro...")
        this.ISBN   = ISBN
        this.autor  = autor
        this.titulo = titulo
    }

}

//let libro1:Libro = new Libro()
//libro1.ISBN = "ABCDE"
//libro1.titulo = "El corazón de las tinieblas"
//libro1.autor = "Joseph Conrad"

let libro1:Libro = new Libro("ABCDE","El corazón de las tinieblas","Joseph Conrad")
console.log(libro1.titulo+", "+libro1.autor)

//Si quisieramos crear un libro sin tener los datos tendríamos que hacer esta cosa fea:
let libro2:Libro = new Libro(null, null, null)

//Podemos asignar valores por defecto a los parámetros del constructor (en realidad a los parámetros
//de cualquier constructor)
class Alumno {
    nombre:string
    direccion:string
    negativos:number

    constructor(nombre   :string = null,
                direccion:string = null,
                negativos:number = 0){
        this.nombre    = nombre
        this.direccion = direccion
        this.negativos = negativos
    }
}

let alumno1:Alumno = new Alumno()
let alumno2:Alumno = new Alumno("Fulanito")
let alumno3:Alumno = new Alumno("Fulanita","C/Falsa,123")
let alumno4:Alumno = new Alumno("Menganito","C/Tal,123",500)
//si solo tenemos los negativos tenemos que hacerlo así
let alumno5:Alumno = new Alumno(null,null,500)
//Si solo tenemos nombre y negavitos:
let alumno6:Alumno = new Alumno("Menganita",null,500)

//
//Modificadores de acceso
//
//-Son opcionales
//
//-Tienen el mismo significado que en C++
//-public
//-protected
//-private
//
//-pueden colocarse en:
//  -atributos
//  -funciones (incluyendo los constructores)
//-no pueden colocarse en la clase

class Prueba {
    //os componentes sin modificador de acceso son 'public'
    dato1 : number
    public    dato2 : number
    protected dato3 : number
    private   dato4 : number

    funcion1(){}
    public funcion2(){}
    protected funcion3(){}
    private funcion4(){}
}

let prueba:Prueba = new Prueba()
prueba.dato1 = 10
prueba.dato2 = 20
//prueba.dato3 = 30 //No es visible y no transpila
//prueba.dato4 = 40 //No es visible y no transpila
prueba.funcion1()
prueba.funcion2()
//prueba.funcion3()
//prueba.funcion4()

//
//Typescript tiene un atajo estupendisimo para definir clases y constructores
//

//Tenemos estas clasecillas...
/*
class Punto {
    public x:number
    public y:number

    constructor(x:number, y:number){
        this.x = x
        this.y = y    
    }
}

class Poligono {
    public nombre:string
    public vertices:number
    public coordenadasVertices:Punto[ ]

    constructor(nombre:string, vertices:number, coordenadasVertices:Punto[]){
        this.nombre = nombre
        this.vertices = vertices
        this.coordenadasVertices = coordenadasVertices
    }
}

class Linea {
    public punto1:Punto
    public punto2:Punto

    constructor(punto1:Punto, punto2:Punto){
        this.punto1 = punto1
        this.punto2 = punto2
    }
}
*/

//Si colocamos modificadores de acceso en los parámetros del constructor
//dichos parámetros se convierten mágicamente en atributos de la clase
//cuyo valor será en entregado al constructor

class Punto {
    //public x:number
    //public y:number

    constructor(public x:number = null, 
                public y:number = null){        
        //this.x = x
        //this.y = y    
    }
}

let punto1 = new Punto(10, 15)
console.log(punto1.x+", "+punto1.y)

class Poligono {
    //public nombre:string
    //public vertices:number
    //public coordenadasVertices:Punto[ ]

    constructor(public nombre:string = null, 
                public vertices:number = null, 
                public coordenadasVertices:Punto[] = null){
        //this.nombre = nombre
        //this.vertices = vertices
        //this.coordenadasVertices = coordenadasVertices
    }
}

class Linea {
    //public punto1:Punto
    //public punto2:Punto

    constructor(public punto1:Punto = null, 
                public punto2:Punto = null){
        //this.punto1 = punto1
        //this.punto2 = punto2
    }
}

//////////////////////////////////////////////////////////////////////////////////

/*
-pantalla de login y registro de usuarios
-pantalla del catálogo
-pantalla de la cesta/pedido
-pantalla de compra
    pedido->factura
-pantalla de facturas


Usuario/Cliente
Producto
Pedido
Factura

*/

class Cliente {
    public constructor(
        public _id      :string = null,
        public login    :string = null,
        public password :string = null,
        public nombre   :string = null,
        public direccion:string = null,
        public telefono :string = null,
        public correoE  :string = null
    ){       
    }
}

class Producto  {
    public constructor(
        public _id         :string = null,
        public nombre      :string = null,
        public fabricante  :string = null,
        public imagen      :string = null,
        //Simplificando:
        public precio      :number = null,
        public existencias :number = null
    ){       
    }
}

class DetallePedido {
    public constructor(
        //public pedido:Pedido, 
        public producto:Producto = null,
        public cantidad:number   = null,
        public precio  :number   = null,
    ){
    }
}

class Pedido {
    public constructor(
        public _id     :string = null,
        public codigo  :string = null,
        public fecha   :string = null,
        private total   :number = 0,
        public estado  :string = null,
        private detalles:DetallePedido[] = null
    ){       
    }

    public getTotal():number{
        return this.total
    }

    public addDetalle(producto:Producto, cantidad:number, precio:number):void{
        //mirar si hay un detalle con ese producto
        //-si no, se añade el detalle
        //-si existe, se suma al existente

        //Recalcular el total
        this.recalcularTotal()
    }
    
    public borrarDetalle(producto:Producto){
        //Buscar el detalle que tiene ese producto y eliminarlo
        
        //recalcular el total
        this.recalcularTotal()
    }

    private recalcularTotal():void{
        //recorrer los detalles multiplcando cantidad y precio y sumando...
    }

}


let pedido:Pedido = new Pedido()

let detalle:DetallePedido = new DetallePedido()
detalle.cantidad = 5
detalle.precio = 5

//pedido.detalles = []
//pedido.detalles.push(detalle)
//pedido.total = 99.99












