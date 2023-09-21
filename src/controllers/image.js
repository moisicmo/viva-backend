const { response } = require('express');

const { subirArchivo } = require('./../helpers');
const sendImage = async (req, res = response) => {


    try {
        console.log(req.files)
        // //agregar ubicación de la imagen
        // const { tempFilePath } = req.files.archivo;
        // const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
        //     folder: "players",
        // });
        // //actualizar
        // // await PlayersModel.update(
        // //   { cus_img: secure_url },
        // //   { where: { id: player.id } }
        // // );
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        // res.json({ nombre });
        res.json({ msg: "Imagen cargado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }

}



module.exports = {
    sendImage,
}