const template = `<!DOCTYPE html>
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

class MailTemplate {
    constructor(nome, id){
        this.nome = nome;
        this.id = id;
    }

    get = function (){
        return template.replace('[Nome do Cliente]', this.nome).replace('[Número do pedido]', this.id);
    }
}

export default MailTemplate;