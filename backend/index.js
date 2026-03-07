// Charger les variables d'environnement
import dotenv from "dotenv";
dotenv.config();
console.log("Clé API détectée :", process.env.OPENAI_API_KEY);

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", generateRoute);
//chemin
app.use("/", express.static(path.join(process.cwd(), "backend")));

// Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);

});
