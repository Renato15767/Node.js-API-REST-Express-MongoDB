// Biblioteca nativa do Node.js
import http from "http";

const PORT = 3000;

// Cria o server
// req = requisição
// res = resposta
const server = http.createServer((req, res) =>{
    // .writeHead escreve o cabeçalho
    // 200 = Tipo da requisição
    // {" Content-Type": "text/plain "} = tipo do argumento
    res.writeHead(200, {"Content-Type": "text/plain"});
    // .end = finaliza/conteúdo
    res.end("Curso de Node.js");
});

// .listen = vai "escuta"
// 3000 é o númeor da porta
server.listen(PORT, () =>{
    console.log("Servidor escutando!");
});
