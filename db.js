import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "minitw",
});

console.log("✅ Conectado a la base de datos MySQL (XAMPP)");