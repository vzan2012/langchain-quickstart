import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  apiKey: process.env.OPEN_API_KEY,
  modelName: "gpt-4o-mini",
});

const response = await model.invoke("What is the capital of Brazil ?");

console.log(response.content);
