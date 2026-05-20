import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

export const generateAIContent = async (prompt) => {
  try {

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    console.log("Start Ai Processing....")
    console.log(prompt);

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();
    console.log("Ai Processing Complete");
    return text;

  } catch (error) {

    console.log("FULL GEMINI ERROR:");

    console.log({
      message: error.message,
      status: error.status,
      details: error.errorDetails,
    });

    if (error.status === 429) {
      return "Rate limit exceeded. Please try again later.";
    }

    return "Something went wrong with AI generation.";
  }
};