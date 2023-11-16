import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController{
    static async listarAutor(req, res, next){
        try{
            const listaAutor = await autor.find({});
            res.status(200).json(listaAutor);
        }catch(erro){
            next(erro);
        }
    }

    static async listarAutorPorId(req, res, next){
        try{
            const id = req.params.id;
            const listaAutorId = await autor.findById(id);

            if(listaAutorId !== null){
                res.status(200).json(listaAutorId);
            }else{
                next(new NaoEncontrado("ID do autor não localizado."));
            }
            
        }catch(erro){
            //Caso de erro, ele irá acionar o midlleware de erro no "app.js"
            next(erro);
        }
    }

    static async cadastrarAutor(req, res, next){
        try{
            const novoAutor = await autor.create(req.body);

            res.status(200).json({ message: "Criado com sucesso!", autor: novoAutor });
        }catch(erro){
            next(erro);
        }
    }

    static async atualizaAutor(req, res, next){
        try{
            const id = req.params.id;

            const autorAtualizado = await autor.findByIdAndUpdate(id, req.body);
            
            if(autorAtualizado !== null){
                res.status(200).json({ message: "Alterado com sucesso!"});
            }else{
                next(new NaoEncontrado("ID do autor não localizado."));
            }

            
        }catch(erro){
            next(erro);
        }
    }

    static async deletaAutor(req, res, next){
        try{
            const id = req.params.id;

            const autorDeletado = await autor.findByIdAndDelete(id);

            if(autorDeletado !== null){
                res.status(200).json({ message: "Apagado com sucesso!"});
            }else{
                next(new NaoEncontrado("ID do autor não localizado."));
            }
            
        }catch(erro){
            next(erro);
        }
    }
}

export default AutorController;