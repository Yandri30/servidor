const express = require('express'); //TRAEMOS EXPRESS
const cors = require('cors');
const bodyParser = require('body-parser');

//INICIALIZACION DE EXPRESS
const app = express();

//ROUTES
const user_routes = require('./routes/user');
const categoria_routes = require('./routes/categoria');
const producto_routes = require('./routes/producto');
const cliente_routes = require('./routes/cliente');
const venta_routes = require('./routes/venta');

//UTILIZAMOS CORS PARA ACCEDER A LOS RECURSOS DEL SERVIDOR 
app.use(cors());

// MIDDLEWARE COKIEE
const cookie = require('cookie-parser');
app.use(cookie());

//CONFIG SERVER
app.use(bodyParser.json()); //ASI USAMOS ARCHIVOS JSON
app.use(bodyParser.urlencoded({ extended: true })); //NOS SERVIRA EN LOS FORMULARIO
app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//USO DE RUTAS DEFINIENDO LA RUTA PADRE
app.use('/api/user', user_routes);
app.use('/api/categoria', categoria_routes)
app.use('/api/producto', producto_routes)
app.use('/api/cliente', cliente_routes)
app.use('/api/venta', venta_routes);

//INDICAMOS QUE PUERTO USAREMOS
const port = process.env.PORT || 3000;

//CONFIGURAMOS POR DONDE SE ESCUCHARA EL SERVIDOR
app.listen(port, function() {
    console.clear();
    console.log("\nServidor corriendo en el puerto: " + port);
    console.log("\nCONEXION CORRECTA");
    console.log("*******************************************");
});