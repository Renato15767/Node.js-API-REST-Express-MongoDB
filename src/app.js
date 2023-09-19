import express from "express";

const app = express();
// Middleware = usado para ter acesso as requisições, respostas e modificá-las
//              ou colocando informações extras
// Irá fazer a conversão para json
app.use(express.json());

// array livros
const livros = [
    {
        id: 1,
        titulo: "O problema dos 3 Corpos"
    },
    {
        id: 2,
        titulo: "Cobras e Lagartos"
    }
]

// Funções

function buscaLivro(id){
    // .findIndex = encontra o determinado elemento em um array
    return livros.findIndex(livro => {
        return livro.id === Number(id)
    })
}

// Criando rotas em Express
app.get("/", (req, res) =>{
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) =>{
    res.status(200).json(livros);
});

// O ":" significa que irá variar
// Pega um livro por ID
app.get("/livros/:id", (req, res) =>{
    // req.params.id = pega o /:id
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

// Add um livro
app.post("/livros", (req, res) =>{
    // Adiciona + livros ao array
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!");
});

// Altera o array livros
app.put("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
});

// Deleta
app.delete("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    // Apaga um elemento pelo "index"
    livros.splice(index, 1);
    res.status(200).send("Livro deletado com sucesso!");
});

// Exportando "app" para outros arquivos
export default app;