import express from "express";
import cors from "cors";
import { connection } from "./db.js";
import postsRouter from "./router/posts.js";
import authRoutes from "./router/auth.js"; // 👈 este archivo debe existir

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // 👈 esto crea /api/auth/login y /api/auth/register

// ✅ Rutas principales
app.use("/api/posts", postsRouter);

// ✅ Conexión MySQL
connection
  .connect()
  .then(() => console.log("✅ Conectado a MySQL"))
  .catch((err) => console.error("❌ Error conectando a MySQL:", err));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});