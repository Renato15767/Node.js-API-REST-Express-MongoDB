// importação do modelo Livro
// para ser chamado pelo controller
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController{
    static async listarLivros(req, res, next){
        try{
            // controller chama o model Livro através
            // do método livro.find({})
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }catch(erro){
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next){
        try{
            // Pega o ID da URL
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            if(livroEncontrado !== null){
                res.status(200).json(livroEncontrado);
            }else{
                next(new NaoEncontrado("ID do livro não localizado."));
            }
            
        }catch(erro){
            next(erro);
        }
    }

    static async cadastrarLivros(req, res, next){
        const novoLivro = req.body;
        try{
            // Pega o autor pelo id do autor em "novoAutor"
            const autorEncontrado = await autor.findById(novoLivro.autor);
            // Adiciona o id do autor ao "novoLivro"
            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc}};
            // Cria livro
            const livroCriado = await livro.create(livroCompleto);

            // Devolve a msg
            res.status(201).json({ message: "Criado com sucesso!", livro: livroCriado });

        }catch(erro){
            next(erro);
        }
    }

    static async atualizaLivro(req, res, next){
        try{
            const id = req.params.id;
            // atualiza o livro de acordo com o id passado
            // O "req.body" vem os dados que serão alterados
            const livroAtualizado = await livro.findByIdAndUpdate(id, req.body);
            if(livroAtualizado !== null){
                res.status(200).json({ message: "Atualizado com sucesso!"});
            }else{
                next(new NaoEncontrado("ID do livro não localizado."));
            }
            
        }catch(erro){
            next(erro);
        }
    }

    static async deletaLivro(req, res, next){
        try{
            const id = req.params.id;
            // Deleta o livro de acordo com o id passado
            // O "req.body" vem os dados que serão alterados
            const livroDeletado = await livro.findByIdAndDelete(id);
            if(livroDeletado !== null){
                res.status(200).json({ message: "Apagado com sucesso!" });
            }else{
                next(new NaoEncontrado("ID do livro não localizado."));
            }
            
        }catch(erro){
            next(erro);
        }
    }

    static async listarLivrosPorEditora(req, res, next){
        // Pega a query "editora"/informação da consulta
        const editora = req.query.editora;
        try{
            // 1-Propriedade. 2-Consulta/informação
            const livrosPorEditora = await livro.find({editora: editora});
            
            // Não está funcionando por algum motivo 
            if(livrosPorEditora !== null){
                res.status(200).json(livrosPorEditora);
            }else{
                next( new NaoEncontrado("Editora do livro não localizado."));
            }
            
        }catch(erro){
            next(erro);
        }
    }
}


export default LivroController;