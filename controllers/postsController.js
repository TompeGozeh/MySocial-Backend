// controllers/postsController.js
import { connection } from "../db.js";

// ✅ Obtener publicaciones del feed
export const getFeedPosts = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al cargar posts:", err);
    res.status(500).json({ message: "Error cargando publicaciones" });
  }
};

// ✅ Crear nueva publicación
export const createPost = async (req, res) => {
  try {
    const { username, content } = req.body;
    if (!username || !content) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    await connection.query(
      "INSERT INTO posts (username, content, created_at) VALUES (?, ?, NOW())",
      [username, content]
    );

    res.json({ message: "✅ Post publicado correctamente" });
  } catch (err) {
    console.error("❌ Error al publicar:", err);
    res.status(500).json({ message: "Error al publicar" });
  }
};
