import express from "express";
import LivroController from "../controllers/livroController.js";

// express.Router() = Método específico que lida com rotas.
const routes = express.Router();

// Vai "routes" vai chamar os métodos na classe "LivroController"
routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.post("/livros", LivroController.cadastrarLivros);
routes.put("/livros/:id", LivroController.atualizaLivro);
routes.delete("/livros/:id", LivroController.deletaLivro);

export default routes;