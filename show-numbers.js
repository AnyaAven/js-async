"use strict";

const URL_NUMBERS_API = "http://numbersapi.com";

/** Get trivia information from Numbers API about num
 *
 * Log out trivia text.
 *
 * Return trivia info example for num 42:
 * {
    text: '42 is the number of kilometers in a marathon.',
    number: 42,
    found: true,
    type: 'trivia'
  }
*/
async function showNumberTrivia(num) {
  const resp = await fetch(`${URL_NUMBERS_API}/${num}?json`);
  const numTrivia = await resp.json();

  const numTriviaText = numTrivia.text;

  // Log out the trivia fact of the num
  console.log({ showNumberTrivia: numTriviaText }, "\n");

  return numTrivia;
}

//showNumberTrivia(42);

/** Get trivia info from Numbers API either from num1, num2, num3, or num4
 *
 * Log out trivia text from the one that resolves the faster
 *
 * Trivia info example:

  showNumberRace(1, 2, 42, 4) <--- num3 is the fastest
  Returns: {
    text: '42 is the number of kilometers in a marathon.',
    number: 42,
    found: true,
    type: 'trivia'
  }
*/
async function showNumberRace(num1, num2, num3, num4) {

  const numP1 = fetch(`${URL_NUMBERS_API}/${num1}?json`);
  const numP2 = fetch(`${URL_NUMBERS_API}/${num2}?json`);
  const numP3 = fetch(`${URL_NUMBERS_API}/${num3}?json`);
  const numP4 = fetch(`${URL_NUMBERS_API}/${num4}?json`);

  const resp = await Promise.race([numP1, numP2, numP3, numP4]);
  const numTrivia = await resp.json();

  const numTriviaText = numTrivia.text;
  console.log({ showNumberRace: numTriviaText }, "\n");

  return numTrivia;
}

//showNumberRace(1, 2, 42, 4);

/**
 * Log trivia facts from num1, num2, num3, and num4 if resolved
 * Get fact info from Numbers API
 *
 * If rejected, log out error message(s):
 * GET http://numbersapi.com/<wrong>?json 404 (Not Found)
 * ["Request failed with status code 404"]
 *
 * Returns list of trivia facts that were resolved
 */
async function showNumberAll(num1, num2, num3, num4) {

  const numP1 = fetch(`${URL_NUMBERS_API}/${num1}?json`);
  const numP2 = fetch(`${URL_NUMBERS_API}/${num2}?json`);
  const numP3 = fetch(`${URL_NUMBERS_API}/${num3}?json`);
  const numP4 = fetch(`${URL_NUMBERS_API}/${num4}?json`);

  const respsWrapper = await Promise.allSettled([numP1, numP2, numP3, numP4]);

  const fulfilledTriviaTexts = [];
  const rejections = [];

  for (const respWrapper of respsWrapper) {

    if (respWrapper.status === "fulfilled" && respWrapper.value.ok === true) {
      const numTrivia = await respWrapper.value.json();
      fulfilledTriviaTexts.push(numTrivia.text);
    } else {
      console.log(respWrapper)
      const resp = respWrapper.value;
      console.error(`GET ${resp.url} ${resp.status} (${resp.statusText})`);
      rejections.push("Request failed with status code 404");
    }
  }

  console.log("showNumberAll fulfilled:", fulfilledTriviaTexts);
  console.log("showNumberAll rejected:", rejections);

  return fulfilledTriviaTexts;
}

//showNumberAll(1, 2, "wrong", 4);

async function main() {
  await showNumberTrivia(96);
  await showNumberRace(1, 2, 3, 4);
  await showNumberAll(1, 2, "wrong", 4);
}

await main();


// waits for main to finish before continuing on!

