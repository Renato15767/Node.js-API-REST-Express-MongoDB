import express from "express";
// Função do dbConnect.js
import conectaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

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
// "app vai para index.js"
routes(app);

// Exportando "app" para outros arquivos
export default app;