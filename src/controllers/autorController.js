import { autor } from "../models/Autor.js";

class AutorController{
    static async listarAutor(req, res){
        try{
            const listaAutor = await autor.find({});
            res.status(200).json(listaAutor);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    }

    static async listarAutorPorId(req, res){
        try{
            const id = req.params.id;
            const listaAutorId = await autor.findById({id});

            res.status(200).json(listaAutorId);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    }

    static async cadastrarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body);

            res.status(200).json({ message: "Criado com sucesso!", autor: novoAutor });
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    }

    static async atualizaAutor(req, res){
        try{
            const id = req.params.id;

            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Alterado com sucesso!"});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    }

    static async deletaAutor(req, res){
        try{
            const id = req.params.id;

            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "Apagado com sucesso!"});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    }
}

export default AutorController;