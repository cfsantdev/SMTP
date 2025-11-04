import 'dotenv/config';
import path from 'path';

class DefautRoute {
    constructor(app){
        this.app = app;
        this.config();
    }

    config = function(){
        this.app.get('/', (req, res) => {
            res.status(200).sendFile(path.join(process.env.__dirname, 'public', 'README.html'));
        });
    }
}

export default DefautRoute;