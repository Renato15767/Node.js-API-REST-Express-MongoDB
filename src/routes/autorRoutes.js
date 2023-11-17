import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutor);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.get("/autores/busca", AutorController.listarAutorPorFiltro);
routes.post("/autores", AutorController.cadastrarAutor);
routes.put("/autores/:id", AutorController.atualizaAutor);
routes.delete("/autores/:id", AutorController.deletaAutor);

export default routes;