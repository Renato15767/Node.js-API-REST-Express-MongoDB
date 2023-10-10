import autor from "../models/Autor.js";

class AutorController{
    static async listarAutor(req, res){
        try{
            const listaAutor = await autor.find({});
            res.status(200).json(listaAutor);
        }catch{
            res.status(500).json({ message: `${erro} - falha na requisição`});
        }
    }
}

export default AutorController;