import express from "express";
// Função do dbConnect.js
import conectaDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";

const conexao = await conectaDatabase();

// on() = estão ligados a eventos (conexão, erro, etc)
conexao.on("error", (erro) =>{
    console.error("Erro de conexão = ", erro);
});

conexao.once("open", () =>{
    console.log("Conexão feita com sucesso!");
});

//------------------------------------------

const app = express();
// Middleware = usado para ter acesso as requisições, respostas e modificá-las
//              ou colocando informações extras
// Irá fazer a conversão para json
app.use(express.json());


// Criando rotas em Express
app.get("/", (req, res) =>{
    res.status(200).send("Curso de Node.js");
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