import { ChatOllama } from "@langchain/ollama";

const localModel = new ChatOllama({
  model: "llama3.2:1b",
});

const prompt = `Which country won the highest medals in Olympics - lifetime ?`;

const response = await localModel.invoke(prompt);

console.log(response.content);
