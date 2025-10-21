import express from "express";
import { connection } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY = "clave_super_secreta";

/* ============================================
   📌 REGISTRO
============================================ */
router.post("/register", async (req, res) => {
  try {
    const { username, password, display_name } = req.body;

    if (!username || !password || !display_name) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      "INSERT INTO users (username, password, display_name) VALUES (?, ?, ?)",
      [username, hashedPassword, display_name]
    );

    res.json({ message: "✅ Usuario registrado correctamente" });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({ error: "Error interno al registrar usuario" });
  }
});

/* ============================================
   📌 LOGIN
============================================ */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // ✅ el token ahora incluye los datos del usuario directamente
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({
      message: "✅ Login exitoso",
      token,
      user: {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error interno al iniciar sesión" });
  }
});

export default router;