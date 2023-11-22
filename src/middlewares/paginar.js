import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next){
    try{
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = 
        req.query;

        // o "split()" separa a pelo ":"
        let [campoOrdenacao, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        // Todo Middleware tem acesso a esse objeto de requisição
        // ou seja, ele também tem acesso no método de "listarLivros"
        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            // controller chama o model Livro através
            // do método livro.find({})
            const resultadoPaginado = await resultado.find()
                // Organiza a listagem, -1 é descrecente e +1 é crescente
                // O "[]" serve para inserir a let dentro do if
                .sort({ [campoOrdenacao]: ordem })
                // Pula os livros, ou seja, mostra os livros futuros/outra página
                .skip((pagina - 1) * limite)
                // Limita a quantidade de livros mostrados
                .limit(limite)
                .exec();

            res.status(200).json(resultadoPaginado);
        } else {
            next(new RequisicaoIncorreta());
        } 

    }catch (erro){
        next(erro);
    }
}

export default paginar;