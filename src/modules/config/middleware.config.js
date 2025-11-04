import Router from '../routes/router.js'
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';


class MiddlewareConfig {
    constructor(app, swaggerFile){
        if(app === null)
            throw new Error('Não foi possível configurar o MIDDLEWARE, Erro: "app" inválido.');

        this.app = app;
        this.swaggerFile = swaggerFile;
        this.config();
    }

    config = function() {
        // *BODYPARSER é um middleware de Node.js que analisa o corpo de requisições HTTP recebidas, como as de métodos POST, PATCH e PUT, 
        // e disponibiliza os dados analisados na propriedade req.body.
        this.app.use(bodyParser.json());

        new Router(this.app);

        // *SWAGGER
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(this.swaggerFile));

        // Timeout global de requisições
        this.app.use((req, res, next) => {
            req.setTimeout(10000, () => {
                console.error('⏱️ Timeout atingido para a requisição.');
                if (!res.headersSent) {
                    res.status(408).json({ error: 'Tempo limite atingido para processar a requisição.' });
                }
            });
            next();
        });

        // Configuração de CORS
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }
}

export default MiddlewareConfig;