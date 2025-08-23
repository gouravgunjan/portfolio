const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Get API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(filePath) {
  const mimeType = filePath.endsWith('.png') ? 'image/png' : 'video/webm';
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const filePath = process.argv[2];
  const expectedDescription = process.argv[3];

  if (!filePath || !expectedDescription) {
    console.error("Usage: node verify-artifact.js <file_path> <expected_description>");
    process.exit(1);
  }

  const prompt = `
    You are a visual verification agent. Your task is to compare an image or video with a given description.

    **Description:**
    ${expectedDescription}

    **Instructions:**
    1. Analyze the provided image/video.
    2. Compare its content and meaning with the description.
    3. If the image/video perfectly matches the description in content and meaning, respond with "PASS".
    4. If there is any mismatch, respond with "FAIL" and provide a brief, one-sentence explanation of the mismatch.
  `;

  const filePart = [fileToGenerativePart(filePath)];

  try {
    const result = await model.generateContent([prompt, ...filePart]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    process.exit(1);
  }
}

run();