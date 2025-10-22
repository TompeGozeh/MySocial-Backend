import express from "express";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
import User from "../models/User.js";

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
    req.user = decoded; // contiene { id, username }
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
    const posts = await Post.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
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
    const { content, image } = req.body;
    const userId = req.user.id;

    if (!content?.trim()) {
      return res.status(400).json({ message: "El contenido es obligatorio" });
    }

    const post = new Post({ content, image, userId });
    await post.save();

    // Recuperar la publicación con datos del usuario
    const newPost = await Post.findById(post._id).populate("userId", "username");

    res.json({ success: true, post: newPost });
  } catch (error) {
    console.error("❌ Error creando publicación:", error);
    res.status(500).json({ message: "Error al crear publicación" });
  }
});

export default router;