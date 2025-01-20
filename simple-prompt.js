import { PromptTemplate } from "@langchain/core/prompts";

const templateObject = {
  template: "How many {item} can fill into a {container} ?",
  inputVariables: ["item", "container"],
};

// const myTemplate = new PromptTemplate(templateObject);

// const prompt = await myTemplate.format({
//   item: "cubes",
//   container: "building",
// });

const myTemplate = PromptTemplate.fromTemplate(templateObject.template);

const prompt = await myTemplate.invoke({
  item: "cubes",
  container: "box",
});

console.log(prompt);
