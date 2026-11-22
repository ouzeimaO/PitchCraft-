import express from "express";
import { generatePitch } from "../services/aiService.js";
import { generatePresentation } from "../services/pptService.js";
import { validateTopic } from "../utils/validateTopic.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const validation = validateTopic(req.body?.topic);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const pitch = await generatePitch(validation.topic);
    if (!pitch || typeof pitch !== "string") {
      throw new Error("Le service IA n'a pas retourné de pitch.");
    }

    const pptFile = await generatePresentation(validation.topic, pitch);
    return res.json({ pitch, pptFile });
  } catch (error) {
    console.error("Erreur pendant la génération du pitch :", error.message);
    return res.status(500).json({
      error: "La génération a échoué. Vérifiez la configuration du serveur et réessayez.",
    });
  }
});

export default router;
