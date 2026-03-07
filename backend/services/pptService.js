import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";

function generatePresentation(pitch) {
  const pptx = new pptxgen();
  pptx.addSlide().addText(pitch, { x: 1, y: 1, fontSize: 18 });

  // Nom unique du fichier
  const fileName = `presentation_${Date.now()}.pptx`;
  const dirPath = path.join(process.cwd(), "backend/files");
  const filePath = path.join(dirPath, fileName);

  // Vérifie si le dossier "files" existe, sinon le crée
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Sauvegarde le fichier PPTX
  return pptx.writeFile({ fileName: filePath }).then(() => fileName);
}

export { generatePresentation };
