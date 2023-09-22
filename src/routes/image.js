const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('./../middlewares');
const { sendImage } = require('./../controllers');


const router = Router();

router.post(
    '/',
    [
        check('photo', 'Falta enviar la imagen').isLength({ min: 1 }),
        validarCampos,
    ],
    sendImage
);

module.exports = router;