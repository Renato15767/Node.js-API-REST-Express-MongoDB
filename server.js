import "dotenv/config";
// Biblioteca nativa do Node.js
// import http from "http";
import app from "./src/app.js";

const PORT = 3000;


// req = requisição
// res = resposta
// .listen = vai "escutar"
// 3000 é o númeor da porta
app.listen(PORT, () =>{
    console.log("Servidor escutando!");
});
