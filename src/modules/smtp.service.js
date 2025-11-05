import 'dotenv/config';
import MailTemplate from './config/mail.template.js';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

class SmtpService {
    static send = async function(email, nome) {
        return new Promise(async (resolve, reject) => {
            const id = uuidv4();
            const resend = new Resend(process.env.SMTP_KEY);
            
            const { data, error } = await resend.emails.send({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'VC NUTRIÇÃO ESPORTIVA - CONFIRMAÇÃO DE COMPRA',
                html: new MailTemplate(nome,id).get(),
            });
            
            if (error) {
                reject(new { data: { error: error }, id: null });
            }

            resolve({ data: data, id: id });
        });
    }
}

export default SmtpService;