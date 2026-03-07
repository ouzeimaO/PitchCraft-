import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ pitch: "❌ Erreur lors de la génération" });
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>PitchCraft 🎤</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entrez un sujet..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "1rem", padding: "0.5rem"}}>
          Générer
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Résultat :</h2>
          <p>{result.pitch}</p>

          {/* 👉 Ici tu ajoutes ton bouton de téléchargement */}
          {result?.pptFile && (
  <a href={`http://localhost:5000/${result.pptFile}`} download>
    📥 Télécharger la présentation
  </a>
)}
        </div>
      )}
    </div>
  );
}

export default App;
