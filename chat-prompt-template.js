import { ChatPromptTemplate } from "@langchain/core/prompts";

const messages = [
  ["system", "You are Python and Javascript Developer"],
  ["user", "{question}"],
];

const myChatPrompt = ChatPromptTemplate.fromMessages(messages);

const prompt = await myChatPrompt.invoke({
  question: "How fast can I learn and be a expert in Python language ?",
});

// console.log(prompt);
console.log(prompt.toChatMessages());
