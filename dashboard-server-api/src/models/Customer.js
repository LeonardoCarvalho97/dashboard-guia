import mongoose from "mongoose";
import { GetCurrentTimeObject } from "../services/index.js";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  // Campos obrigatórios
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  // Campos opcionais
  matricula: {
    type: String,
    unique: true,
  },
  rg: {
    type: String,
    unique: true,
  },
  cpf: {
    type: String,
    unique: true,
  },
  detalhesCliente: {
    type: String,
  },
  cidade: {
    type: String,
  },
  dataNascimento: {
    type: String,
  },
  genero: {
    type: String,
  },
  conveniosAtivos: [
    {
      type: Schema.Types.ObjectId,
      ref: "agreements",
    },
  ],
  endereco: {
    rua: { type: String },
    cep: { type: String },
    uf: { type: String },
  },

  // Registrando data
  registerDate: {
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject(),
    immutable: true,
  },
  lastUpdate: {
    type: Schema.Types.Mixed,
    default: () => GetCurrentTimeObject(),
  },
});

const Customers = mongoose.model("customers", CustomerSchema);

export default Customers;
