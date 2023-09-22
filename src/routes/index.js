import express from "express";
import livros from "./livroRoutes.js";

// "app" vem do app.js
const routes = (app) =>{
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

    // Middleware = usado para ter acesso as requisições, respostas e modificá-las
    //              ou colocando informações extras
    // Irá fazer a conversão para json
    app.use(express.json(), livros);
};

export default routes;