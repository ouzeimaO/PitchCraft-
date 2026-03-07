import fetch from "node-fetch";

async function testBackend() {
  const response = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic: "Intelligence Artificielle" }),
  });

  const data = await response.json();
  console.log("Réponse du backend :", data);
}

testBackend();
