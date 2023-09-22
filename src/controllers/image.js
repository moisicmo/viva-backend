const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const sendImage = async (req, res) => {
    try {
        const base64String = req.body.photo;

        // Separar la cadena base64 del encabezado
        let base64Image = base64String.split(';base64,').pop();

        // Generar un nombre de archivo único con extensión .jpg (4 caracteres)
        const uniqueName = generateRandomName(4) + '.jpg';

        const uploadPath = path.join(__dirname, '../../uploads/imgs', uniqueName);

        // Escribir la cadena base64 como un archivo .jpg
        fs.writeFile(uploadPath, base64Image, { encoding: 'base64' }, function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    errors: [{ msg: "Error al cargar la imagen" }]
                });
            } else {
                // Responder con un mensaje de éxito
                res.json({ msg: "Imagen cargada correctamente" });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [{ msg: "Error al cargar la imagen" }]
        });
    }
};

// Función para generar un nombre aleatorio de longitud fija
function generateRandomName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomName = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters.charAt(randomIndex);
    }
    return randomName;
}




module.exports = {
    sendImage,
}