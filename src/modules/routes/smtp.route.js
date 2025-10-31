
import MailTemplate from '../config/mail.template.js'
import NodeMailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

class SmtpRoute {
    constructor(app){
        this.app = app;
    }

    set = function() {
        this.app.post('/smtp', (req, res) => {
            const { email, nome } = req.body;
            
            // Expressão regular simples para validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                return res.status(400).json({ error: 'O campo email é obrigatório.' });
            }
        
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'O email fornecido é inválido.' });
            }
        
            const transporter = NodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true para 465, false para outros
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                },
                connectionTimeout: 10000, // 10 segundos de timeout para as requisições
                socketTimeout: 20000,     // 20 segundos de timeout para a conexão
            });
        
            let id = uuidv4();
        
            transporter.sendMail({
                from: transporter.options.auth.user,
                to: email,
                subject: 'VC NUTRIÇÃO ESPORTIVA - CONFIRMAÇÃO DE COMPRA',
                text: 'Email de confirmação enviado utilizando a o serviço SMTP.',
                html: new MailTemplate(nome,id).get()
            })
            .then(() => {
                console.log('Nodemailer(200): { "uuid": "' + id + '"  "email": "' + email + '", "nome": "' + nome + '" }');
                res.status(200).json({ uuid: id, email, nome: nome })
            })
            .catch((err) => {
                console.log('Nodemailer(400): { "uuid": "' + id + '"  "email": "' + email + '", "nome": "' + nome + '" }');
                res.status(400).json({ error: 'Erro ao enviar email: ' + err })
            });
        });
    }
}

export default SmtpRoute;