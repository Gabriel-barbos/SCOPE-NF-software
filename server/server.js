const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const destinatarioRoutes = require("./routes/destinatarios");
const zohoRoutes = require("./services/zoho");
const notaRoutes = require('./routes/notas');
const testNuvemFiscalRoutes = require("./routes/testeNuvemFiscal");

const { CONFIG } = require('./services/nuvemfiscal'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['https://nf-client-self.vercel.app', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado ao MongoDB Atlas"))
.catch(err => console.error("❌ Erro MongoDB:", err));

// Rotas
app.use("/destinatarios", destinatarioRoutes);
app.use("/zoho", zohoRoutes);
app.use("/nota", notaRoutes);
app.use("/test-nuvemfiscal", testNuvemFiscalRoutes);

// Teste básico
app.get("/", (req, res) => res.send("API de Destinatários funcionando ✅"));

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

// Logs de ambiente da Nuvem Fiscal
console.log("🚀 Ambiente ativo:", CONFIG.AMBIENTE);
console.log("🔗 URL API:", CONFIG.API_URL);
console.log("🚀 Ambiente ativo:", process.env.NUVEM_FISCAL_AMBIENTE);
