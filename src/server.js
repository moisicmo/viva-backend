const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const fileUpload = require('express-fileupload');


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
        // Directorio para imagenes
        const publicPathImg = path.resolve(__dirname, './../uploads/imgs');
        this.app.use(express.static(publicPathImg));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
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
