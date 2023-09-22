// importação do modelo Livro
// para ser chamado pelo controller
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
        try{
            // Cria um novo livro 
            const novoLivro = await livro.create(req.body);
            // Devolva a msg
            res.status(201).json({ message: "Criado com sucesso!", livro: novoLivro });

        }catch(erro){
            res.status(500).json({ message: `${erro} - Falha ao cadastrar Livro!` })
        }
    }

    static async atualizaLivro(req, res){
        try{
            const id = req.params.id
            // atualiza o livro de acordo com o id passado
            // O "req.body" vem os dados que serão alterados
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Atualizado com sucesso!" });;
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na altualização do livro` });
        }
    }
};


export default LivroController;