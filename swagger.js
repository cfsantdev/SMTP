import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Serviço SMTP Automatizado',
    description: 'API para envio de emails automáticos via Nodemailer',
    version: '1.0.0',
  },
  components: [],
  host: process.env.HOST,
  schemes: ['http','https'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './src/modules/routes/default.route.js',
    './src/modules/routes/smtp.route.js'
]; // 👈 ajuste conforme seu projeto

swagger(outputFile, endpointsFiles, doc).then(async () => {
  // Importa o servidor principal (index.js)
  const { default: app } = await import('./src/app.js');
});