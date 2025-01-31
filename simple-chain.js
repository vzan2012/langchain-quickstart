import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const localModel = new ChatOllama({
  model: "llama3.2:1b",
});

const templateString = "Suggest me three nicknames for a {pet_animal}";

const promptTemplate = PromptTemplate.fromTemplate(templateString);

// const chain = RunnableSequence.from([promptTemplate, localModel]);

const chain = promptTemplate.pipe(localModel);

const response = await chain.invoke({
  pet_animal: "Lion",
});

console.log(response.content);
