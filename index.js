import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

// =====================================
// 🚀 CONFIGURACIÓN BÁSICA
// =====================================
const app = express();
app.use(cors());
app.use(express.json());

// =====================================
// 🌐 CONEXIÓN A MONGODB ATLAS
// =====================================
const MONGO_URI = "mongodb+srv://emersoncastro1411_db_user:3152871041@minitw.0i179fs.mongodb.net/minitw?retryWrites=true&w=majority";

try {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Conectado a MongoDB Atlas");
} catch (error) {
  console.error("❌ Error al conectar a MongoDB:", error);
}

// =====================================
// 🧩 RUTAS PRINCIPALES
// =====================================
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRouter);

// =====================================
// 🟢 INICIAR SERVIDOR
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});