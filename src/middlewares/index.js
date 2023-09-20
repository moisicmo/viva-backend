
const validarArchivo = require('./validar-archivo');
const validaCampos = require('./validar-campos');

module.exports = {
    ...validaCampos,
    ...validarArchivo,
}