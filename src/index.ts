import express from "express";
import type { Request, Response, NextFunction } from "express";
import { cargarDatos } from "./data/estudiantes.data.js";
import estudiantesRouter from "./routes/estudiantes.routes.js";
import cursoRouter from "./routes/cursos.routes.js";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
//si queremos q cualquier persona se pueda conectar
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

const swaggerFilePath = path.resolve("./src/swagger-output.json");
if (fs.existsSync(swaggerFilePath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("archivo swagger-output.json no encontrado");
}

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Vivo");
});
app.use("/estudiante", estudiantesRouter);
app.use("/cursos", cursoRouter);
// aplicacion escuchando el puerto 3000
app.listen(PORT, async () => {
  await cargarDatos();
  console.log(`servidor corriendo en el puerto : http://localhost:${PORT}`);
  console.log(`MODO DE EJECUCION:${process.env.NODE_ENV}`);
  console.log(`CLAVE API CARGADA ${process.env.API_KEY ? "si" : "no"}`);
});
