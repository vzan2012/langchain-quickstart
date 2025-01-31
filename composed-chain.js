import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const localModel = new ChatOllama({
  model: "llama3.2:1b",
});

const templateString = "Suggest me three nicknames for a {pet_animal}";
const promptTemplate = PromptTemplate.fromTemplate(templateString);

const templateString2 = "Which of these {pet_names} is a good pet ?";
const promptTemplate2 = PromptTemplate.fromTemplate(templateString2);

const chain = promptTemplate.pipe(localModel);
const composedChain = RunnableSequence.from([
  chain,
  (input) => ({
    pet_names: input.content,
  }),
  promptTemplate2,
  localModel,
]);

const response = await composedChain.invoke({
  pet_animal: "Cat",
});

console.log(response.content);
