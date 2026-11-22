export function validateTopic(value) {
  if (typeof value !== "string") {
    return { valid: false, error: "La description du projet est obligatoire." };
  }

  const topic = value.trim();
  if (topic.length < 5) {
    return { valid: false, error: "Décrivez votre projet en au moins 5 caractères." };
  }
  if (topic.length > 1200) {
    return { valid: false, error: "La description ne doit pas dépasser 1 200 caractères." };
  }

  return { valid: true, topic };
}
