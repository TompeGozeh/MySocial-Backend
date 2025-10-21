import express from "express";

const router = express.Router();

router.get("/feed", (req, res) => {
  res.json({ message: "✅ Ruta /api/posts/feed funcionando correctamente" });
});

export default router;
