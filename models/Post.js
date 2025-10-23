import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // referencia al modelo de usuario
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true, // elimina espacios extra
      maxlength: 280, // límite opcional tipo Twitter
    },
  },
  {
    timestamps: true, // genera createdAt y updatedAt automáticamente
  }
);

// Previene error de recompilación de modelos en hot reload o Vercel
export default mongoose.models.Post || mongoose.model("Post", postSchema);
