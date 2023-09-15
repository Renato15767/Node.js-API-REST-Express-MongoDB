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

// Criando rotas em Express
app.get("/", (req, res) =>{
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) =>{
    res.status(200).json(livros);
});

app.post("/livros", (req, res) =>{
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!");
});

// Exportando "app" para outros arquivos
export default app;