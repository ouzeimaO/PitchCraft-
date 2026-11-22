import express from "express";
import { generatePitch } from "../services/aiService.js";
import { generatePresentation } from "../services/pptService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const topic = typeof req.body?.topic === "string" ? req.body.topic.trim() : "";

  if (topic.length < 5) {
    return res.status(400).json({ error: "Décrivez votre projet en au moins 5 caractères." });
  }

  if (topic.length > 1200) {
    return res.status(400).json({ error: "La description ne doit pas dépasser 1 200 caractères." });
  }

  try {
    const pitch = await generatePitch(topic);
    if (!pitch || typeof pitch !== "string") {
      throw new Error("Le service IA n'a pas retourné de pitch.");
    }

    const pptFile = await generatePresentation(topic, pitch);
    return res.json({ pitch, pptFile });
  } catch (error) {
    console.error("Erreur pendant la génération du pitch :", error.message);
    return res.status(500).json({
      error: "La génération a échoué. Vérifiez la configuration du serveur et réessayez.",
    });
  }
});

export default router;
