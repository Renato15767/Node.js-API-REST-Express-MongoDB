import mongoose, {mongo} from "mongoose";

// A função deverá ser assíncrona
async function conectaDatabase(){
    // Faz a conexão com o BD
    // OBS: devemos colocar a senha e o DB que iremos conectar depois do ".net/"
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    // retorna todas as informações que a API precisa para se conectar
    return mongoose.connection;
};

export default conectaDatabase;