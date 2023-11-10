import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

// Schema é um objeto de configuração que será usado para o 
// Mongoose definir internamente a estrutura e as propriedades
// de um livro, um autor ou qualquer outro documento.
const livroSchema = new mongoose.Schema({
    // type: = é o tipo do dado
    id: { type: mongoose.Schema.Types.ObjectId },
    // "required: true" = campo obrigatório
    titulo: { 
        type: String, 
        required: [true, "O título do Livro é obrigatório."] 
    },
    editora: { 
        type: String, 
        required: [true, "A editora é obrigatória."],
        // Propriedade que filtra valores
        enum: {
            values: ["Aleph", "Teste"],
            message: "A editora {VALUE} não é permitida."
        }
    },
    preco: { type: Number },
    paginas: { 
        type: Number,
        min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido foi {VALUE}."],
        max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido foi {VALUE}."]
    },
    autor: autorSchema
},
// Se será versionado ou não
{versionKey: false});

// Fechamento do modelo
const livro = mongoose.model("livro", livroSchema);
//mongoose.model("livro", livroSchema) = se refere a coleção e o Schema criado

export default livro;