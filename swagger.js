const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Store Api',
      description: 'sistema de Tienda',
      version: '1.0.0',
    },
  },
  apis: ['./routes/categoria.js'], // Ruta de tus archivos de rutas
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
