import SmtpRoute from './smtp.route.js';

class Router {
    constructor(app){
        this.app = app;
    }

    config = function () {
        this.app.get('/', (req, res) => {
            res.send('SMTP Service started...');
        });
        
        new SmtpRoute(this.app).set();
    }
}

export default Router;