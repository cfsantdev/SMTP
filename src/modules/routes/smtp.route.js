
import MailTemplate from '../config/mail.template.js';
import NodeMailer from 'nodemailer';
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
            const transporter = NodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true para 465, false para outros
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            if(!await transporter.verify()){
                return res.status(400).json({ error: 'Falha na verificação do transportador.' });
            }
            
            await transporter.sendMail({
                from: transporter.options.auth.user,
                to: email,
                subject: 'VC NUTRIÇÃO ESPORTIVA - CONFIRMAÇÃO DE COMPRA',
                text: 'Email de confirmação enviado utilizando a o serviço SMTP.',
                html: new MailTemplate(nome,id).get()
            })
            .then((info) => {
                console.log('Nodemailer(200): { "uuid": "' + id + '"  "info": "' + JSON.stringify(info) + '" }');
                res.status(200).json({ uuid: id, email, nome: nome })
            })
            .catch((err) => {
                console.log('Nodemailer(400): { "uuid": "' + id + '"  "email": "' + email + '", "nome": "' + nome + '", "erro": "' + JSON.stringify(err) + '" }');
                res.status(400).json({ error: 'Erro ao enviar email: ' + err })
            });
        });
    }
}

export default SmtpRoute;