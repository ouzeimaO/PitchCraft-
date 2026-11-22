import React, { useState } from "react";
import "./App.css";
import { generatePitch, getPresentationUrl } from "./api";

const examples = [
  "Une application de livraison de repas locaux",
  "Une plateforme de formation en ligne",
  "Un service de recyclage des déchets",
];

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanTopic = topic.trim();

    if (cleanTopic.length < 5) {
      setError("Décris ton idée en au moins 5 caractères.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await generatePitch(cleanTopic);
      if (!data.pitch) {
        throw new Error(data.error || "Aucun pitch n'a été retourné.");
      }
      setResult(data);
    } catch (requestError) {
      setError(requestError.message || "La génération a échoué. Réessaie dans un instant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="PitchCraft, accueil">
          <span className="brand-mark">P</span>
          <span>PitchCraft</span>
        </a>
        <div className="topbar-right">
          <span className="status-dot" />
          <span className="topbar-label">Votre copilote de présentation</span>
          <span className="avatar">PC</span>
        </div>
      </header>

      <main className="main-content">
        <section className="intro">
          <div className="eyebrow"><span className="sparkle">✦</span> DONNEZ VIE À VOS IDÉES</div>
          <h1>Votre prochaine grande idée<br /><span>mérite un grand pitch.</span></h1>
          <p className="intro-copy">
            Transformez une simple idée en un pitch clair et convaincant,
            puis préparez votre présentation en quelques instants.
          </p>
        </section>

        <section className="workspace">
          <div className="workspace-heading">
            <div>
              <span className="step-label">ÉTAPE 01</span>
              <h2>Parlons de votre projet</h2>
              <p>Commencez par décrire votre idée avec vos propres mots.</p>
            </div>
            <div className="heading-icon" aria-hidden="true">✎</div>
          </div>

          <form onSubmit={handleSubmit} className="pitch-form">
            <label htmlFor="project-topic">Quelle idée souhaitez-vous présenter ?</label>
            <textarea
              id="project-topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Ex. : Je souhaite créer une plateforme qui aide les petits commerçants à vendre leurs produits en ligne..."
              rows={5}
              maxLength={1200}
              disabled={loading}
            />
            <div className="form-meta">
              <span>Soyez simple et précis. Vous pourrez affiner le résultat ensuite.</span>
              <span>{topic.length}/1200</span>
            </div>

            <div className="examples">
              <span className="examples-label">Besoin d'inspiration ?</span>
              <div className="example-list">
                {examples.map((example) => (
                  <button
                    className="example-chip"
                    type="button"
                    key={example}
                    onClick={() => setTopic(example)}
                    disabled={loading}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="feedback feedback-error" role="alert">{error}</div>}

            <div className="form-actions">
              <span className="privacy-note"><span aria-hidden="true">✦</span> Une première version, à améliorer avec vous.</span>
              <button className="primary-button" type="submit" disabled={loading || !topic.trim()}>
                {loading ? <><span className="spinner" /> Génération en cours...</> : <>Générer mon pitch <span aria-hidden="true">↗</span></>}
              </button>
            </div>
          </form>
        </section>

        {result && (
          <section className="result-card" aria-live="polite">
            <div className="result-header">
              <div>
                <span className="step-label">VOTRE RÉSULTAT</span>
                <h2>Votre pitch est prêt</h2>
              </div>
              <span className="result-badge">Généré avec l'IA</span>
            </div>
            <div className="pitch-output">{result.pitch}</div>
            {result.pptFile && (
              <a className="download-button" href={getPresentationUrl(result.pptFile)} download>
                Télécharger la présentation PowerPoint <span aria-hidden="true">↓</span>
              </a>
            )}
          </section>
        )}

        <footer className="page-footer">
          <span>PitchCraft</span>
          <span>Des idées plus claires. Des présentations plus fortes.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
