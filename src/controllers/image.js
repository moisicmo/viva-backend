const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const sendImage = async (req, res) => {
    try {
        const base64String = req.body.photo;

        // Separar la cadena base64 del encabezado
        let base64Image = base64String.split(';base64,').pop();

        // Generar un nombre de archivo único con extensión .jpg (4 caracteres)
        const uniqueName = generateRandomName(4);
        const uploadPath = path.join(__dirname, '../../uploads/imgs', `${uniqueName}.jpg`,);

        // Escribir la cadena base64 como un archivo .jpg
        fs.writeFile(uploadPath, base64Image, { encoding: 'base64' }, function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({
                    errors: [{ msg: "Error al cargar la imagen" }]
                });
            } else {
                res.json({ msg: "Imagen cargada correctamente", codeImage: uniqueName });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [{ msg: "Error al cargar la imagen" }]
        });
    }
};

const getImage = async (req, res) => {
    try {
        const id = req.params.id + '.jpg';
        const filePath = path.join(__dirname, '../../uploads/imgs', id);
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('Imagen no encontrada');
        }

        // Establecer las cabeceras de la respuesta
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', `inline; filename=${id}`);

        // Enviar el archivo como un flujo de datos (stream)
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            errors: [{msg: "Hubo un error"}]
        })
    }
}

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
    getImage,
}