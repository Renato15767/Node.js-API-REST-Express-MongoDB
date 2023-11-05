// A classe "ErrorBase" está herdando de outra classe, chaamada "Error" 
class ErroBase extends Error{
    // Ao ser criado a classe, o Construtor irá rodar
    constructor(mensagem = "Erro interno do Servidor.", status = 500){
        super();
        this.message = mensagem;
        this.status = status;
    }

    enviarResposta(res){
        res.status(this.status).send({
            mensagem: this.message,
            status: this.status
        });
    }
}

export default ErroBase;