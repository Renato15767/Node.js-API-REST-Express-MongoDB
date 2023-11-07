// Middleware normal
import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next){
    const erro404 = new NaoEncontrado();
    // Encaminha para o "manipuladorDeErros.js"
    next(erro404);
}

export default manipulador404;