import mongoose from "mongoose";

const URI = "mongodb+srv://emersoncastro1411_db_user:3152871041@minitw.0i179fs.mongodb.net/?retryWrites=true&w=majority&appName=minitw";

export const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
    process.exit(1);
  }
};