import express from "express";
import { connection } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY = "clave_super_secreta";

/* ============================================
   🔐 Middleware para verificar el token JWT
============================================ */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // ✅ ahora contiene directamente id, username, display_name
    next();
  } catch (error) {
    console.error("❌ Token inválido:", error);
    res.status(403).json({ message: "Token inválido o expirado" });
  }
}

/* ============================================
   📌 OBTENER PUBLICACIONES (Feed general)
============================================ */
router.get("/feed", async (req, res) => {
  try {
    const [rows] = await connection.query(`
      SELECT p.id, p.content, p.created_at,
             u.username, u.display_name
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error obteniendo publicaciones:", error);
    res.status(500).json({ message: "Error al obtener publicaciones" });
  }
});

/* ============================================
   📌 CREAR PUBLICACIÓN (solo usuarios logueados)
============================================ */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content?.trim()) {
      return res.status(400).json({ message: "El contenido es obligatorio" });
    }

    // Insertar el nuevo post
    const [result] = await connection.query(
      "INSERT INTO posts (user_id, content, created_at) VALUES (?, ?, NOW())",
      [userId, content]
    );

    // Recuperar la publicación recién creada con datos del usuario
    const [newPost] = await connection.query(
      `
      SELECT p.id, p.content, p.created_at, u.username, u.display_name
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
      `,
      [result.insertId]
    );

    res.json({ success: true, post: newPost[0] });
  } catch (error) {
    console.error("❌ Error creando publicación:", error);
    res.status(500).json({ message: "Error al crear publicación" });
  }
});

export default router;
