import * as clack from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

let counterErrors;

async function main() {
  console.clear();

  counterErrors = 0;
  await setTimeout(1000);

  clack.intro(
    `${color.underline("Let's see how much you know about web development.")}`
  );

  const project = await clack.group(
    {
      firstQ: () =>
        clack.select({
          message: `Question 1: What is the purpose of the "viewport" meta tag in HTML?`,
          options: shuffleAnswers([
            {
              value: "1",
              label: "Specifies the character encoding of the document",
            },
            {
              value: "2",
              label: "Defines the visible area of a web page on a device",
            },
            { value: "3", label: "Manages the version control of the webpage" },
          ]),
        }),
      secondQ: () =>
        clack.select({
          message: `Question 2: In the context of JavaScript, what is a closure?`,
          options: shuffleAnswers([
            {
              value: "1",
              label: "A function that is called before the page is loaded",
            },
            {
              value: "2",
              label:
                "A function that has access to an outer function's scope from within its own scope",
            },
            {
              value: "3",
              label:
                "A variable declared inside a function using the 'var' keyword",
            },
          ]),
        }),
      thirdQ: () =>
        clack.select({
          message: `Question 3: Which organization is responsible for defining web standards, including HTML and CSS?`,
          options: shuffleAnswers([
            { value: "1", label: "W3C (World Wide Web Consortium)" },
            {
              value: "2",
              label: "IETF (Internet Engineering Task Force)",
            },
            {
              value: "3",
              label: "ISO (International Organization for Standardization)",
            },
          ]),
        }),
      fourthQ: () =>
        clack.select({
          message: `Question 4: What is the role of the "defer" attribute in the "script" tag?`,
          options: shuffleAnswers([
            {
              value: "1",
              label:
                "Delays the execution of the script until after the page has been parsed",
            },
            {
              value: "2",
              label: "Specifies that the script should be executed immediately",
            },
            {
              value: "3",
              label:
                "Determines the order in which multiple scripts are executed on a page",
            },
          ]),
        }),
      fifthQ: () =>
        clack.select({
          message: `Question 5: What is the role of the "DOCTYPE" declaration in an HTML document?`,
          options: shuffleAnswers([
            {
              value: "1",
              label: "Specifies the character encoding of the document",
            },
            {
              value: "2",
              label: "Includes external stylesheets in the document",
            },
            {
              value: "3",
              label:
                "Defines what elements and attributes are allowed to be used in a certain flavor of HTML",
            },
          ]),
        }),
    },
    {
      onCancel: () => {
        clack.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  const s = clack.spinner();

  s.start("Checking answers...");

  checkAnswers(project);

  await setTimeout(2000);

  s.stop(
    `Answers checked, errors : ${
      counterErrors ? `${counterErrors} ❌` : `${counterErrors} ✅ congrats!`
    }`
  );

  const project2 = await clack.group({
    confirm: () =>
      clack.confirm({
        message: `Want to try again ?`,
        initialValue: false,
        options: [
          { value: true, label: "Yes, please" },
          { value: false, label: "No, thanks" },
        ],
      }),
  });

  project2.confirm ? main() : clack.outro(`Thanks for trying!`);
}

const checkAnswers = (project) => {
  checkAnswer(project.firstQ, "2");
  checkAnswer(project.secondQ, "2");
  checkAnswer(project.thirdQ, "1");
  checkAnswer(project.fourthQ, "1");
  checkAnswer(project.fifthQ, "3");
};

const checkAnswer = (answer, rightAnswer) => {
  return answer == rightAnswer ? "" : counterErrors++;
};

const shuffleAnswers = (answersArray) => {
  return answersArray.sort(() => Math.random() - 0.5);
};

main().catch(console.error);
