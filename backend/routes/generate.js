import express from "express";
import { generatePitch } from "../services/aiService.js";
import { generatePresentation } from "../services/pptService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { topic } = req.body;
  try {
    // Génération du pitch avec GPT‑5
    const pitch = await generatePitch(topic);

    // Génération du PowerPoint
    const pptFile = await generatePresentation(topic, pitch);

    res.json({ pitch, pptFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
