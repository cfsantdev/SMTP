import defautRoute from './default.route.js';
import smtpRoute from './smtp.route.js';

class Router {
    constructor(app){
        this.app = app;
        this.config();
    }

    config = function () {
        new defautRoute(this.app);
        new smtpRoute(this.app);
    }
}

export default Router;