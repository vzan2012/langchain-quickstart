import {
  PipelinePromptTemplate,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

const systemPrompt = PromptTemplate.fromTemplate(
  "You are helpful AI assistant is also a movie buff"
);

const aiExampleResponsePrompt =
  PromptTemplate.fromTemplate(`Your response should be always be in this format
    Question: Can you recommend a {example_genre} movie ?
    Answer: Sure, {example_answer} is a great choice.`);

const newConversationPrompt = PromptTemplate.fromTemplate(
  "Question: Can you recommend a {question_genre} movie ?"
);

const finalHumanPrompt = PromptTemplate.fromTemplate(`
    {systemRole},
    {aiExampleResponse},
    {newConversation},
`);

const composedPrompt = new PipelinePromptTemplate({
  finalPrompt: finalHumanPrompt,
  pipelinePrompts: [
    {
      name: "systemRole",
      prompt: systemPrompt,
    },
    {
      name: "aiExampleResponse",
      prompt: aiExampleResponsePrompt,
    },
    {
      name: "newConversation",
      prompt: newConversationPrompt,
    },
  ],
});

// const formattedPrompt = await composedPrompt.format({
//   example_genre: "sci-fi",
//   example_answer: "Blade Runner 2042",
//   question_genre: "comedy",
// });

// console.log(formattedPrompt);

const chain = composedPrompt.pipe(geminiModel);

const response = await chain.invoke({
  example_genre: "sci-fi",
  example_answer: "Minority Report",
  question_genre: "horror",
});

console.log(response);
console.log(response.content);
