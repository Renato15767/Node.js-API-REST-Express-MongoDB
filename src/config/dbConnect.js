import mongoose, {mongo} from "mongoose";

// A função deverá ser assíncrona
async function conectaDatabase(){
// Faz a conexão com o BD
  // Pega a var. de ambiente do ".env"
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  // retorna todas as informações que a API precisa para se conecta 
  return mongoose.connection;
}

export default conectaDatabase;