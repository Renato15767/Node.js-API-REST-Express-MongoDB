import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase{
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos."){
        // Vai para a classe "ErroBase"
        super(mensagem, 400);
    }
}

export default RequisicaoIncorreta;