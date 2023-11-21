// importação do modelo Livro
// para ser chamado pelo controller
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController{
    static async listarLivros(req, res, next){
        try{
            let { limite = 5, pagina = 1 } = req.query;

            limite = parseInt(limite);
            pagina = parseInt(pagina);

            if (limite > 0 && pagina >0){
                // controller chama o model Livro através
                // do método livro.find({})
                const listaLivros = await livro
                    .find()
                    .skip((pagina - 1) * limite)
                    .limit(limite)
                    .populate("autor");

                res.status(200).json(listaLivros);
            }else{
                next(new RequisicaoIncorreta());
            } 
        }catch(erro){
            next(erro);
        }
    }

    static async listarLivroPorId(req, res, next){
        try{
            // Pega o ID da URL
            const id = req.params.id;
            const livroEncontrado = await livro
                .findById(id)
                .populate("autor");

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
        try {
            let livroResp = new livro(req.body);
      
            const livroResultado = await livroResp.save();
      
            res.status(201).json(livroResultado);
        } catch (erro) {
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

    // Para busca no POSTMAN -> /busca?editora=Aleph&titulo=Neuromancer
    static async listarLivrosPorFiltro(req, res, next){
        try{
            const buscaFinal = await processaBusca(req.query);

            if (buscaFinal !== null){
                // populate() = coloca as informações dos models
                const livrosResultado = await livro
                    .find(buscaFinal)
                    .populate("autor");

                res.status(200).json(livrosResultado);
            }else{
                res.status(200).json({message: "Nenhum livro encontrado com esse autor(a)"});
            }
        }catch(erro){
            next(erro);
        }
    }
}

async function processaBusca(parametros){
    const {editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

    // Cria uma regex para conseguir fazer uma busca sem precisar de todas as informações
    // o "i" considera letras maísculas e minúsculas
    //const regex = new RegExp(titulo, "i");

    // Cria um objeto para filtrar
    let busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

    if (minPaginas || maxPaginas) busca.paginas = {};

    // $gte = Greater Than or Equal = Maior ou igual
    if (minPaginas) busca.paginas.$gte = minPaginas;
    // $lte = Less Than or Equal = Menor ou igual
    if (maxPaginas) busca.paginas.$lte = maxPaginas;

    if (nomeAutor){
        const autorResu = await autor.findOne({ nome: nomeAutor });

        if(autorResu !== null){
            busca.autor = autorResu._id;
        }else{
            busca = null;
        } 
    }
    return busca;
}


export default LivroController;


/*
    Método antigo
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
*/