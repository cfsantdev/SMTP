
import 'dotenv/config';
import SmtpService from '../smtp.service.js';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

class SmtpRoute {
    constructor(app){
        this.app = app;
        this.config();
    }

    config = function(){
        this.app.post('/smtp', async (req, res) => {
            try {
                const { email, nome } = req.body;

                // Expressão regular simples para validar email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!email) {
                    throw new Error('O campo email é obrigatório.');
                }
            
                if (!emailRegex.test(email)) {
                    throw new Error('O email é fornecido é inválido.');
                }

                const {data, id} = await SmtpService.send(email, nome);
                if(data === null){
                    throw new Error('Erro ao consumir o serviço SMTP.');
                }

                if(id === null){
                    throw new Error('Erro ao consumir o serviço SMTP.');
                }

                console.log('Nodemailer(200): { "uuid": "' + id + '"  "data": "' + JSON.stringify(data) + '" }');
                res.status(200).json({ uuid: id, email, nome: nome });
            } catch (err) {
                console.log('Nodemailer(500): { "email": "' + email + '", "nome": "' + nome + '", "error": "' + err + '" }');
                res.status(500).json({ error: err })
            }
        });
    }
}

export default SmtpRoute;