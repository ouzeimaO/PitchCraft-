import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(currentDirectory, "../files");

async function generatePresentation(topic, pitch) {
  const presentation = new pptxgen();
  presentation.layout = "LAYOUT_WIDE";
  presentation.author = "PitchCraft";
  presentation.subject = "Présentation de projet";
  presentation.title = `Pitch — ${topic.slice(0, 80)}`;
  presentation.company = "PitchCraft";
  presentation.lang = "fr-FR";
  presentation.theme = {
    headFontFace: "Aptos Display",
    bodyFontFace: "Aptos",
    lang: "fr-FR",
  };

  const green = "176B55";
  const dark = "17211F";
  const muted = "64736B";
  const white = "FFFFFF";

  const cover = presentation.addSlide();
  cover.background = { color: "F4F8F5" };
  cover.addShape(presentation.ShapeType.rect, {
    x: 0, y: 0, w: 0.18, h: 7.5, line: { color: green }, fill: { color: green },
  });
  cover.addText("PITCHCRAFT  /  PRÉSENTATION DE PROJET", {
    x: 0.8, y: 0.8, w: 10.5, h: 0.3, fontFace: "Aptos", fontSize: 11,
    bold: true, charSpacing: 2, color: green, margin: 0,
  });
  cover.addText(topic, {
    x: 0.8, y: 2.0, w: 10.8, h: 2.2, fontFace: "Aptos Display",
    fontSize: 30, bold: true, color: dark, breakLine: false,
    valign: "mid", margin: 0.04, fit: "shrink",
  });
  cover.addText("Une idée mérite une présentation claire.", {
    x: 0.82, y: 5.7, w: 9.8, h: 0.4, fontSize: 16, color: muted, margin: 0,
  });
  cover.addText("Généré avec PitchCraft", {
    x: 0.82, y: 6.85, w: 5, h: 0.25, fontSize: 10, color: muted, margin: 0,
  });

  const paragraphs = String(pitch).split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const chunks = [];
  for (let index = 0; index < paragraphs.length; index += 5) {
    chunks.push(paragraphs.slice(index, index + 5));
  }
  if (chunks.length === 0) chunks.push([String(pitch)]);

  chunks.forEach((lines, index) => {
    const slide = presentation.addSlide();
    slide.background = { color: white };
    slide.addText(index === 0 ? "LE PITCH" : `LE PITCH — SUITE ${index}`, {
      x: 0.65, y: 0.45, w: 11.8, h: 0.35, fontSize: 11,
      bold: true, charSpacing: 1.5, color: green, margin: 0,
    });
    slide.addShape(presentation.ShapeType.line, {
      x: 0.65, y: 0.95, w: 12, h: 0, line: { color: "DCE8E0", width: 1 },
    });
    slide.addText(lines.join("\n\n"), {
      x: 0.75, y: 1.3, w: 11.6, h: 5.25, fontSize: 19,
      breakLine: false, color: dark, valign: "top", margin: 0.08,
      paraSpaceAfterPt: 12, fit: "shrink",
    });
    slide.addText(`PITCHCRAFT  •  ${index + 2}`, {
      x: 10.5, y: 7.05, w: 2.1, h: 0.2, fontSize: 9,
      color: muted, align: "right", margin: 0,
    });
  });

  fs.mkdirSync(outputDirectory, { recursive: true });
  const fileName = `presentation_${Date.now()}.pptx`;
  const filePath = path.join(outputDirectory, fileName);
  await presentation.writeFile({ fileName: filePath });
  return `files/${fileName}`;
}

export { generatePresentation };
