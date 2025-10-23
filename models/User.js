import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // elimina espacios en blanco al principio y final
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // buena práctica mínima para contraseñas
    },
    display_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // agrega automáticamente createdAt y updatedAt
  }
);

// Exporta el modelo si no existe (evita error en hot reload)
export default mongoose.models.User || mongoose.model("User", userSchema);
