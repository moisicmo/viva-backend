const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);

        this.paths = {
            //auth
            image: '/api/image',
        };

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }


    middlewares() {

        this.app.use(express.json({ limit: '50mb' }));
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        const publicPath = path.resolve(__dirname, './../public');
        this.app.use(express.static(publicPath));
    }

    routes() {
        //image
        this.app.use(this.paths.image, require('./routes/image'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;
