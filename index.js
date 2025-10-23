import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import { connectDB } from "./db.js";

// =====================================
// ⚙️ CONFIGURACIÓN INICIAL
// =====================================
dotenv.config(); // Cargar variables de entorno desde .env
const app = express();

app.use(cors());
app.use(express.json());

// =====================================
// 🌐 CONEXIÓN A MONGODB ATLAS
// =====================================
connectDB();

// =====================================
// 🧩 RUTAS PRINCIPALES
// =====================================
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRouter);

app.get("/api/test", (req, res) => {
  res.send("✅ Servidor funcionando correctamente");
});

// =====================================
// 🟢 INICIAR SERVIDOR
// =====================================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});
