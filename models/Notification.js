import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // referencia al usuario que recibe la notificación
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    isRead: {
      type: Boolean,
      default: false, // por defecto, la notificación no está leída
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);

// Previene error de recompilación en hot reload (Vercel / Next.js)
export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
