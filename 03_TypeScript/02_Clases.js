////////////
// CLASES //
////////////
//Las clases on los moldes que se utilizan para crear los objetos
//Identidad/estado  : datos
//Funcionalidad     : qué hace
var CuentaBancaria = /** @class */ (function () {
    function CuentaBancaria() {
    }
    //Funcionalidad
    //Dentro de una clase no se utiliza la palabra reservada 'function'
    CuentaBancaria.prototype.toString = function () {
        //Pra acceder a un componente de la clase dentro de una de sus funciones
        //hay que utilizar 'this'
        return this.IBAN + this.banco + this.sucursal + this.dc + this.libreta;
    };
    return CuentaBancaria;
}());
//Instanciando un objeto
//Sin usar el tipo:
//let cb1 = new CuentaBancaria()
//
//Usando el tipo (una vez creada una clase tenemos un nuevo tipo de variables):
var cb1 = new CuentaBancaria();
cb1.IBAN = "ABCD";
//cb1.IBAN = 1234
cb1.banco = 1234;
//cb1.banco = "ABCD"
cb1.sucursal = 5678;
cb1.dc = 90;
cb1.libreta = 1234567890;
//cb1.tocoto = 100
//
//Contructores
//
//En typescript podemos tener un constructor (y solo uno)
//No hay sobrecarga de constructores
//El constructor debe llamarse 'constructor'
//El constructor no devuelve nada, pero no es 'void'
//Todas las clases tienen constructor, aunque sea implícitamente
var Libro = /** @class */ (function () {
    //En el constructor colocamos el código necesario para inicializar el objeto
    function Libro(ISBN, autor, titulo) {
        console.log("Creando un libro...");
        this.ISBN = ISBN;
        this.autor = autor;
        this.titulo = titulo;
    }
    return Libro;
}());
//let libro1:Libro = new Libro()
//libro1.ISBN = "ABCDE"
//libro1.titulo = "El corazón de las tinieblas"
//libro1.autor = "Joseph Conrad"
var libro1 = new Libro("ABCDE", "El corazón de las tinieblas", "Joseph Conrad");
console.log(libro1.titulo + ", " + libro1.autor);
