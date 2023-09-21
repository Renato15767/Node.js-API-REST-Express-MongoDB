import express from "express";
import LivroController from "../controllers/livroController";

// express.Router() = Método específico que lida com rotas.
const routes = express.Router();

routes.get("/livros", LivroController.listarLivros);