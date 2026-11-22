import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import generateRoute from "./routes/generate.js";

const app = express();
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const filesDirectory = path.join(currentDirectory, "files");

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/files", express.static(filesDirectory));
app.use("/api", generateRoute);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`PitchCraft API démarrée sur le port ${PORT}`);
});
