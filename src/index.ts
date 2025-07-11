import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";

configDotenv();

const API_KEY = process.env.GOOGLE_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

const prompt_text = "Tell, what's you know about valorant?";

console.log(prompt_text);

(async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const { response } = await model.generateContent(prompt_text);
  console.log("Hello, Gemini here!");
  console.log(response.text());
})();
