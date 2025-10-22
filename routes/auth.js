import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = new User({
      username,
      password: hashedPassword,
      display_name,
    });

    await newUser.save();

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

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: user._id,
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
        id: user._id,
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