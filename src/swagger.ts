import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
const doc = {
  info: {
    title: "API de gestion academica",
    description: "Documentacion generada automaticamente por swagger-autogen",
    version: "1.0.0",
  },
  host: "gdhtg49q-3000.brs.devtunnels.ms",
  basePath: "/",
  schemes: ["https"],
};
//archivo generado
const outputFile = "./src/swagger-output.json";

//archivos q seran leidos por swagger-autogen
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);
