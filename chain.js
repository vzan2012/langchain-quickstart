import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are expert in {area_of_expertise}"],
  ["user", "{question}"],
]);

const stringParser = new StringOutputParser();

const chatChain = promptTemplate.pipe(model).pipe(stringParser);

const response = await chatChain.invoke({
  area_of_expertise: "UI/UX Educational Consultant",
  question: "How to write and publish research articles related to UI/UX",
});

console.log(response);
