const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('./../middlewares');
const { sendImage, getImage } = require('./../controllers');


const router = Router();

router.post(
    '/',
    [
        check('photo', 'Falta enviar la imagen').isLength({ min: 1 }),
        validarCampos,
    ],
    sendImage
);

router.patch(
    '/photo/:id',
    [
        check('id', 'El parámetro "id" es requerido y debe ser una cadena').isLength({ min: 1}),
        validarCampos,
    ],
    getImage
);

module.exports = router;