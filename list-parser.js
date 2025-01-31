import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";

const localModel = new ChatOllama({
  model: "llama3.2:1b",
});

const templateString =
  "List 10 countries in {continent}. \n {format_instructions}";

const promptTemplate = PromptTemplate.fromTemplate(templateString);

const listParser = new CommaSeparatedListOutputParser();

const formatInstructions = listParser.getFormatInstructions();

// console.log(formatInstructions);

const chain = promptTemplate.pipe(localModel);

const response = await chain.invoke({
  continent: "Europe",
  format_instructions: formatInstructions,
});

console.log(response);

const formattedResponse = await listParser.parse(response.content);

console.log(formattedResponse);
// console.log("\n");
// console.log("\n");
// console.log(typeof formattedResponse);
