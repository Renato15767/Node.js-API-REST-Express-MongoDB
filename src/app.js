import express from "express";

const app = express();

// 
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

// Criando uma rota em Express
app.get("/", (req, res) =>{
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) =>{
    res.status(200).json(livros);
});

// Exportando "app" para outros arquivos
export default app;