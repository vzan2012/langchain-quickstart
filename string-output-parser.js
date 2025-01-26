import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";

const localModel = new ChatOllama({
  model: "llama3.2:1b",
});

const prompt = `What do you think about Pitcher Plants ?`;

const response = await localModel.invoke(prompt);

const stringOutputParser = new StringOutputParser();

const formattedResponse = await stringOutputParser.parse(response.content);

console.log(formattedResponse);
console.log("\n");
console.log("\n");
console.log(typeof formattedResponse);
