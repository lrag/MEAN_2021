
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




