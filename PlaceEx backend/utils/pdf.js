import fs from "fs";

export async function extractTextFromPdf(filePath) {
  try {
    // dynamic import prevents pdf-parse from executing anything at module load time
    const pdfModule = await import("pdf-parse");
    // pdfModule.default for CJS default export; pdfModule itself may be the function
    const pdfParse = pdfModule.default || pdfModule;

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text || "";
  } catch (err) {
    // safe fallback: log and return empty string so ATS won't crash
    console.error(
      "PDF parsing error (utils/pdf.js):",
      err && err.message ? err.message : err
    );
    return "";
  }
}
