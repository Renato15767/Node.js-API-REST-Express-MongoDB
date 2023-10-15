// importação do modelo Livro
// para ser chamado pelo controller
import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController{
    static async listarLivros(req, res){
        try{
            // controller chama o model Livro através
            // do método livro.find({})
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async listarLivroPorId(req, res){
        try{
            // Pega o ID da URL
            const id = req.params.id
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }
    }

    static async cadastrarLivros(req, res){
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
            res.status(500).json({ message: `${erro} - Falha ao cadastrar Livro!` });
        }
    }

    static async atualizaLivro(req, res){
        try{
            const id = req.params.id
            // atualiza o livro de acordo com o id passado
            // O "req.body" vem os dados que serão alterados
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Atualizado com sucesso!" });
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na altualização do livro` });
        }
    }

    static async deletaLivro(req, res){
        try{
            const id = req.params.id
            // Deleta o livro de acordo com o id passado
            // O "req.body" vem os dados que serão alterados
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Apagado com sucesso!" });
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao apagar o livro` });
        }
    }

    static async listarLivrosPorEditora(req, res){
        // Pega a query "editora"/informação da consulta
        const editora = req.query.editora;
        try{
            // 1-Propriedade. 2-Consulta/informação
            const livrosPorEditora = await livro.find({ editora: editora});
            res.status(200).json(livrosPorEditora);
        }catch{
            res.status(500).json({ message: `${erro.message} - falha ao apagar o livro` });
        }
    }
};


export default LivroController;