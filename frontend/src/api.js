const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");

export async function generatePitch(topic) {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Impossible de générer le pitch. Vérifiez que le serveur est démarré.");
  }

  return data;
}

export function getPresentationUrl(filePath) {
  const safePath = String(filePath || "").replace(/^\/+/, "");
  return `${API_BASE_URL}/${safePath.split("/").map(encodeURIComponent).join("/")}`;
}
