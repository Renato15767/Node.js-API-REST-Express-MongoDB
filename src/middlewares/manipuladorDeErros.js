// Irá mandar uma resposta em todas as funções dos COntrollers, caso de um erro

import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next){
    if(erro instanceof mongoose.Error.CastError){
        res.status(400).json({ message: "Um ou mais dados fornecidos estão incorretos."});
    }else if(erro instanceof mongoose.Error.ValidationError){
        // .map(erro = erro.message) = Está reescrevendo cada uma daquelas propriedades do objeto apenas pela message
        const mensagensErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ");

        res.status(400).json({message: `Os seguintes erros foram encontrados: ${mensagensErro}`});
    }else{
        res.status(500).json({ message: `${erro.message} - Erro interno do Servidor.`});
    }
}

export default manipuladorDeErros;