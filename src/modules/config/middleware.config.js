import bodyParser from 'body-parser';
import cors from 'cors';

class MiddlewareConfig {
    constructor(app){
        if(app === null)
            throw new Error('Não foi possível configurar o MIDDLEWARE, Erro: "app" inválido.');

        this.app = app;
    }

    config = function() {
        // *BODYPARSER é um middleware de Node.js que analisa o corpo de requisições HTTP recebidas, como as de métodos POST, PATCH e PUT, 
        // e disponibiliza os dados analisados na propriedade req.body.
        this.app.use(bodyParser.json());

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