import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

// Schema é um objeto de configuração que será usado para o 
// Mongoose definir internamente a estrutura e as propriedades
// de um livro, um autor ou qualquer outro documento.
const livroSchema = new mongoose.Schema({
    // type: = é o tipo do dado
    id: { type: mongoose.Schema.Types.ObjectId },
    // "required: true" = campo obrigatório
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema
},
// Se será versionado ou não
{versionKey: false});

// Fechamento do modelo
const livro = mongoose.model("livro", livroSchema);
//mongoose.model("livro", livroSchema) = se refere a coleção e o Schema criado

export default livro;