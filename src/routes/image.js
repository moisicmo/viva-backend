const { Router } = require('express');
const { validarArchivoSubir, validarCampos } = require('./../middlewares');
const { sendImage } = require('./../controllers');


const router = Router();

router.post(
    '/',
    [
        validarArchivoSubir,
        validarCampos,
    ],
    sendImage
);

module.exports = router;