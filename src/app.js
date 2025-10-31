import 'dotenv/config';
import express from 'express';
import MiddlewareConfig from './modules/config/middleware.config.js';
import Router from './modules/routes/router.js'

const app = express();
new MiddlewareConfig(app).config();
new Router(app).config();

app.listen(process.env.PORT, () => {
    console.clear();
    console.log('-');
    console.log('-');
    console.log('*** SERVIÇO DE ENVIO DE EMAILS AUTOMATIZADO ***');
    console.log('Desenvolvido por: CFSant DEV - 2025.');
    console.log('-');
    console.log('-> Acesse o arquivo ".README" ou contate o administrador do sistema para informações de configuração;');
    console.log(`-> Serviço rodando na porta ${process.env.PORT};`);
});