require('dotenv/config');
const NODEMAILER = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const uuid = require('uuid');

// Middleware para processar JSON
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send('SMTP Service started...');
});

// Rota para receber um email via POST
app.post('/smtp', (req, res) => {
    const { email, nome } = req.body;
    
    // Expressão regular simples para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        return res.status(400).json({ error: 'O campo email é obrigatório.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'O email fornecido é inválido.' });
    }

    const transporter = NODEMAILER.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true para 465, false para outros
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    let id = uuid.v4();
    let template = `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>PLANO ALIMENTAR</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background: #000000;
                            color: white;
                            text-align: center;
                            padding: 10px;
                            font-size: 20px;
                            border-radius: 8px 8px 0 0;
                        }
                        .content {
                            padding: 20px;
                            text-align: center;
                            border: solid 1px #000000
                        }
                        .footer {
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">Confirmação de Compra</div>
                        <div class="content">
                            <p>Olá, <strong>[Nome do Cliente]</strong>,</p>
                            <p>Obrigado por sua compra! Seu pedido <strong>#[Número do pedido]</strong> foi confirmado.</p>
                            <p>Em breve, enviaremos atualizações sobre o envio.</p>
                        </div>
                        <div class="footer">
                            &copy; 2025 VC Nutrição Esportiva. Todos os direitos reservados.
                        </div>
                    </div>
                </body>
                </html>`;

    transporter.sendMail({
        from: transporter.options.auth.user,
        to: email,
        subject: 'VC NUTRIÇÃO ESPORTIVA - CONFIRMAÇÃO DE COMPRA',
        text: 'Email de confirmação enviado utilizando a o serviço SMTP.',
        html: template.replace('[Nome do Cliente]', nome).replace('[Número do pedido]', id)
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

// Iniciando o servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});