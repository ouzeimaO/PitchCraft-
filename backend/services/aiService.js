import OpenAI from "openai";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis .env
dotenv.config();

// Initialiser le client OpenAI avec la clé API
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fonction pour générer un pitch
async function generatePitch(topic) {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: `Crée un pitch captivant sur : ${topic}`,
  });

  return response.output_text;
}

export { generatePitch };
