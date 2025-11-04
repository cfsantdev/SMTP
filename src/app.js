import 'dotenv/config';
import express from 'express';
import MiddlewareConfig from './modules/config/middleware.config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

process.env.__filename = fileURLToPath(import.meta.url);
process.env.__dirname = path.dirname(process.env.__filename);

const app = express();
app.use(express.json());
app.use('/public', express.static(path.join(process.env.__dirname, 'public')));

new MiddlewareConfig(app, JSON.parse(fs.readFileSync('./swagger-output.json')));

app.listen(process.env.PORT, () => {
    console.clear();
    console.log('-');
    console.log('-');
    console.log('*** SERVIÇO DE ENVIO DE EMAILS AUTOMATIZADO ***');
    console.log('Desenvolvido por: CFSant DEV — 2025.');
    console.log('-');
    console.log('-> Acesse o arquivo ".README" ou contate o administrador do sistema para informações de configuração;');
    console.log(`-> Serviço rodando na porta ${process.env.PORT};`);
    console.log('-');
    console.log('LOGGER:');
});