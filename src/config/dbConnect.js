import mongoose, {mongo} from "mongoose";

// A função deverá ser assíncrona
async function conectaDatabase(){
    // Faz a conexão com o BD
    // OBS: devemos colocar a senha e o DB que iremos conectar depois do ".net/"
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.4g2igk6.mongodb.net/livraria?retryWrites=true&w=majority");

    // retorna todas as informações que a API precisa para se conectar
    return mongoose.connection;
};

export default conectaDatabase;