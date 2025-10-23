import mongoose from "mongoose";

export const connectDB = async () => {
  const URI = process.env.MONGO_URI;

  if (!URI) {
    console.error("❌ No se encontró la variable MONGO_URI en Render");
    process.exit(1);
  }

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};