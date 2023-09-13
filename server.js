// Biblioteca nativa do Node.js
import http from "http";

const PORT = 3000;


const rotas = {
    // O "/" ´r a rota base, sem nenhum assunto específico
    "/": "Curso de Express",
    "/livros": "Entrei na rota Livros",
    "/autores": "Entrei na rota Autores"
};

// Cria o server
// req = requisição
// res = resposta
const server = http.createServer((req, res) =>{
    // .writeHead escreve o cabeçalho
    // 200 = Tipo da requisição
    // {" Content-Type": "text/plain "} = tipo do argumento
    res.writeHead(200, {"Content-Type": "text/plain"});
    // .end = finaliza/conteúdo
    // rotas[req.url] = traz a priedade "url" de rotas
    res.end(rotas[req.url]);
});

// .listen = vai "escutar"
// 3000 é o númeor da porta
server.listen(PORT, () =>{
    console.log("Servidor escutando!");
});
