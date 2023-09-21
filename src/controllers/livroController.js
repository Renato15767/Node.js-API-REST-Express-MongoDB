import livro from "../models/Livro.js";

class LivroController{

    // static = permitre usar o método sem a classe ser instânciada
    // É async, porque está lidando com o BD
    static async listarLivros (req, res){
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    }

};

export default LivroController;