import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

// Ele herda "RequisicaoIncorreta", porque ele terá o mesmo erro de status, o 400
class ErroValidacao extends RequisicaoIncorreta{
    constructor(erro){
        // .map(erro = erro.message) = Está reescrevendo cada uma daquelas propriedades do objeto apenas pela message
        const mensagensErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ");

        super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}

export default ErroValidacao;