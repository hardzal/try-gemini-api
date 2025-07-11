import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

configDotenv();

const API_KEY = process.env.GOOGLE_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

(async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const input_text = readline.createInterface({
    input,
    output,
  });

  const prompt_text = await input_text.question(
    "Hello, Gemini here!, How can I help you? "
  );

  // menampilkan secara langsung text keseluruhan
  //   const { response } = await model.generateContent(prompt_text);
  //   console.log(response.text());

  // menampilkan teks secara bertahap (Typing text)
  const newResponse = await model.generateContentStream(prompt_text);
  for await (const chunk of newResponse.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }

  console.log();
  input_text.close();
})();
