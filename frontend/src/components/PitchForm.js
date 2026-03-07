import React, { useState } from "react";
import { generatePitch } from "../api";

function PitchForm({ onResult }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generatePitch(topic);
      onResult(data);
    } catch (err) {
      onResult({ pitch: "❌ Erreur lors de la génération" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Entrez un sujet..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button type="submit" style={{ marginLeft: "1rem", padding: "0.5rem" }}>
        Générer
      </button>
      {loading && <p>⏳ Génération en cours...</p>}
    </form>
  );
}

export default PitchForm;
