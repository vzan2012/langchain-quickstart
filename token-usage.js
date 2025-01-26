import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const localModel = new ChatOllama({
  model: "llama3.2:1b",
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["user", "Generate a nursery rhyme for a kid aged between 2 to 3 years"],
]);

const formattedPrompt = await promptTemplate.format();

const response = await localModel.invoke(formattedPrompt);

console.log(`Response: ${response.content} \n \n`);
console.log(`Input Tokens: ${response.usage_metadata.input_tokens}`);
console.log(`Output Tokens: ${response.usage_metadata.output_tokens}`);
console.log(`Total Tokens: ${response.usage_metadata.total_tokens}`);
