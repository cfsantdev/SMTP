
import 'dotenv/config';
import MailTemplate from '../config/mail.template.js';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

class SmtpRoute {
    constructor(app){
        this.app = app;
        this.config();
    }

    config = function(){
        this.app.post('/smtp', async (req, res) => {
            let id = uuidv4();
            try {
                const { email, nome } = req.body;

                // Expressão regular simples para validar email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!email) {
                    return res.status(400).json({ error: 'O campo email é obrigatório.' });
                }
            
                if (!emailRegex.test(email)) {
                    return res.status(400).json({ error: 'O email fornecido é inválido.' });
                }
                
                await this.send(req, res, email, nome, id);
            } catch (err) {
                console.log('Nodemailer(400): { "uuid": "' + id + '"  "email": "' + email + '", "nome": "' + nome + '" }');
                res.status(400).json({ error: 'Erro ao enviar email: ' + err })
            }
        });
    }

    send = async function(req, res, email, nome, id) {
        return new Promise(async (resolve, reject) => {
            const resend = new Resend(process.env.SMTP_KEY);
            
            await resend.emails.send({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'VC NUTRIÇÃO ESPORTIVA - CONFIRMAÇÃO DE COMPRA',
                html: new MailTemplate(nome,id).get(),
            }).then((data) => {
                if(data.error){
                    console.log('Nodemailer(400): { "uuid": "' + id + '"  "email": "' + email + '", "nome": "' + nome + '", "erro": "' + JSON.stringify(data.error) + '" }');
                    res.status(data.error.statusCode).json({ error: 'Erro ao enviar email: ' + data.error.message });
                }
                console.log('Nodemailer(200): { "uuid": "' + id + '"  "data": "' + JSON.stringify(data) + '" }');
                res.status(200).json({ uuid: id, email, nome: nome })
            }).catch((err) => {
                console.log('Nodemailer(400): { "uuid": "' + id + '"  "email": "' + email + '", "nome": "' + nome + '", "erro": "' + JSON.stringify(err) + '" }');
                res.status(400).json({ error: 'Erro ao enviar email: ' + err })
            });
        });
    }
}

export default SmtpRoute;