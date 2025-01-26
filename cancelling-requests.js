import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const localModel = new ChatOllama({
  model: "llama3.2:1b",
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "Reply every prompt in Tamil language"],
  ["user", "{input}"],
]);

const chainToCancel = promptTemplate.pipe(localModel);

const controller = new AbortController();

console.time("Cancellation Timer");

setTimeout(() => controller.abort(), 500);

try {
  await chainToCancel.invoke(
    {
      input: "Who are you ?",
    }
    // {
    //   signal: controller,
    // }
  );
} catch (error) {
  console.log(error);
}

console.timeEnd("Cancellation Timer");
