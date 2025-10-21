import express from "express";
import cors from "cors";
import { connection } from "./db.js";
import postsRouter from "./router/posts.js";
import authRoutes from "./router/auth.js";

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRouter);

// 🔹 Conexión MySQL
const connectToDB = async () => {
  try {
    await connection.connect();
    console.log("✅ Conectado a MySQL correctamente");
  } catch (err) {
    console.error("❌ Error conectando a MySQL:", err);
  }
};

connectToDB();

// 🔹 Puerto dinámico (Render lo asigna automáticamente)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(Servidor backend corriendo en el puerto ${PORT});
});