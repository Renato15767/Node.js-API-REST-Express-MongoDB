import mongoose from "mongoose";

// Irá validar todos os Tipos String em nossos "Models"
// Ou seja, quando houver algum campo vazio em qualquer tipo 
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim() !== "",
    // o "path" irá mostrar exatamente o campo em branco
    message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});