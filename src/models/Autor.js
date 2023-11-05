import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    nome: { 
        type: String, 
        // Mensagem de erro personalizada
        required: [true, "O nome do(a) autor(a) é obrigatório"]
    },
    nacionalidade: { type: String }
},
{versionKey: false});

const autor = mongoose.model("autores", autorSchema);

export {autorSchema, autor};
