//npm install mongoose
let mongoose = require("mongoose")

//Le proporcionaremos a Mongoose una url a la base de datos que incluya el esquema
let url = "mongodb://localhost:27017/tienda"


let Usuario = null

console.log("Conectando con la base de datos...")
mongoose
    .connect( url, { useNewUrlParser:true, useUnifiedTopology:true })
    .then( () => {
        console.log("Conectado!") 

        //En Mongoose definimos los ESQUEMAS que se utilizaran en la base de datos
        //Para cada colección definiremos un objeto con sus propiedades
        //Y SUS TIPOS
        //-ObjectId
        //-String
        //-Number
        //-Date
        //-boolean
        //-buffer
        //-Object 
        //-Decimal128
        //-Array
        //-Map 

        //Pasos a seguir
        //-definir el esquema
        //-a partir del esquema crear el modelo
        //-una vez que tengamos el modelo ya podemos disfritar de la comodidad que resulta
        //de que hagan las cosas por ti

        //Cuando creamos el esquema no indicamos cual será la coleccion que guardará los documentos
        let esquemaUsuario = new mongoose.Schema({
            //Si queremos que sea el driver el que le de valor al _id
            //no lo añadiremos al esquema            
            //_id       : ObjectID,
            login: {
                type: String,
                required: true
            },
            pw        : String,
            rol       : String,
            nombre    : String,
            direccion : String,
            telefono  : String,
            correoE   : String,
            idioma    : String
        })

        //Creamos el modelo
        //let Modelo = mongoose.model('nombre de la colección', esquema)
        //Cuando definimos el modelo indicamos el nombre de la colección
        //y nos olvidamos de él para siempre
        //mongoose.model devuelve una función prototipo
        //si la invocamos con 'new' tendremos un hermoso objeto cuyas propiedades
        //son las definidas en el esquema y que además tiene una serie de
        //funciones relacionadas con la persistencia

        //Prototipo.count() -> cuantos documentos hay        

        //Le pedimos a mongoose que nos cree un prototipo basado en el esquema
        Usuario = mongoose.model('usuarios', esquemaUsuario)

        //A partir de este momento cada vez que necesitemos un usuario hacemos el new del prototipo
        let usuario = new Usuario()

        //De momento solo tiene valor en _id
        console.log(usuario)
        
        //El prototipo define unas cuantas funciones chulis
        //for(let propiedad in usuario){
        //    console.log(propiedad)
        //}

        usuario.login     = "bartolo"
        usuario.pw        = "1234567890"
        usuario.nombre    = "Bart"
        usuario.direccion = "C/Evergreen Terrace"

        //Nadie nos impide añadirle propiedades que no están en el esquema, pero
        //luego mongoose las ignorará
        usuario.trololo = "lololo"

        console.log(usuario)

        /////////////////////////
        //INSERTAR UN DOCUMENTO//
        /////////////////////////

        //La llamada a 'save' inserta el objeto en la colección correspondiente
        //Save es asíncrono y funciona con callbacks y promesas
        //Una vez insertado nos proporcionan el objeto tal cual haya quedado
        //en la base de datos

        //Cuidado! Debemos asegurarnos de que el objeto no tiene null como valor de _id
        //antes del save si queremos que nos devuelvan el _id generado por mongoDB 

        //return usuario.save()
    })
    .then( usuarioInsertado => {

        console.log("Insertado:", usuarioInsertado)

        //Tambien podemos proporcionar un objeto normal y corriente cuando hacemos 'new'

        let usrNormalYCorriente = {
            login     : 'douglasquaid',
            pw        : '1234567890',
            nombre    : 'Douglas Quaid',
            direccion : 'Marte',
            //Esta propiedad no está en el esquema que hemos definido y se ignorará
            TOCOTO    : 'ARSA'
        }
        let usuario2 = new Usuario(usrNormalYCorriente)
        usuario2.TACATA = "CHIM PUN"

        //return usuario2.save()
    })
    .then( usuarioInsertado => {
        console.log("Usuario 2 insertado:", usuarioInsertado)

        ////////////////////
        //BÚSQUEDA POR _ID//
        ////////////////////
        
        //Para buscar documentos utilizamos directamente el modelo
        
        //Buscar el primer documento que cumpla un criterio:
        //Usuario.findOne( { _id : new ObjectI("605aff556469ce299cc7cf89") })
        //Si el criterio es el _id mejor usar findById:
        return Usuario.findById("605aff556469ce299cc7cf89")
    })
    .then( usuarioEncontrado => {  

        console.log("Usuario encontrado:", usuarioEncontrado)

        //////////
        //BORRAR//
        //////////

        //Podemos hacerlo en dos fases:
        //-buscar el objeto
        //-pedirle que se borre
        /*
        Usuario.findById("605b0531ad207d2dc03595c3")
        .then( usr => {
            console.log("Encontrado:"+usr.nombre)
            //Le pedidos al objeto que se borre (cruel)
            return usr.deleteOne()
        })
        .then( () => {
            console.log("Usuario borrado.")
        })
        .catch( error => console.log(error) )
        */

        //Tambien podemos utilizar directamente el modelo para borrar en un único movimiento
        /*
        Usuario.findByIdAndRemove("605b09732a16031ddcd99ce6")
        .then( () => {
            //console.log("Arguments", arguments)
            console.log("Usuario borrado")
        })
        .catch( error => console.log(error) )
        */
    })
    .then( () => {

        /////////////
        //MODIFICAR//
        /////////////

        Usuario
        .findById("605aff556469ce299cc7cf89")
        .then( usuarioEncontrado => {
            console.log("=======================================================")
            console.log(usuarioEncontrado)
            usuarioEncontrado.telefono = "987 654 321"
            //save, si el objeto tiene un valor en _id que existe en la colección MODIFICA
            return usuarioEncontrado.save()
        })
        .then(x => {
            console.log("Usuario modificado")
        })
        .catch( error => console.log(error) )

        //Usuario.findByIdAndUpdate

         console.log("Desconectando...")
        //return mongoose.disconnect()
    })
    .then( () => {
        console.log("Desconectado!") 
        console.log("FIN")
    })
    .catch( error => console.log(error) )

