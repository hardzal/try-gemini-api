import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";

const app = express();
app.use(express.json());

configDotenv();

const GEMINI_KEY = process.env.GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function analyzeWithGemini(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.log(error);
    return null;
  }
}

app.get("/", (req, res) => {
  res.send("Server is running. Use the /validate endpoints");
});

app.post("/validate/institution", async (req, res) => {
  const { institution } = req.body;
  const response = await analyzeWithGemini(
    `Is '${institution}' a valid financial institution? Reply 'true' or 'false'.`
  );

  res.json({
    found: !!response,
    institution_name: institution,
    valid: response?.toLowerCase().includes("true"),
  });
});

app.post("/validate/name", async (req, res) => {
  const { name } = req.body;
  const response = await analyzeWithGemini(
    `Check if the name '${name}' existsn in the document. Reply 'true' or 'false'.`
  );

  res.json({
    found: !!response,
    valid: response?.toLowerCase().includes("true"),
  });
});

app.post("/validate/amount", async (req, res) => {
  const { amount } = req.body;
  const response = await analyzeWithGemini(
    `Check if the amount '${amount}' exists in the document. Reply 'true' or 'false'.`
  );

  res.json({
    found: !!response,
    valid: response?.toLowerCase().includes("true"),
  });
});

app.post("/validate/date", async (req, res) => {
  const { days } = req.body;
  const response = await analyzeWithGemini(
    `Check if the document contains a date within the last '${days} days. Reply 'true' or 'false'`
  );

  res.json({
    found: !!response,
    valid: response?.toLowerCase().includes("true"),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
