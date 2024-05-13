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
  console.log({ numTriviaText });

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
  console.log({ numTriviaText });

  return numTrivia;
}

//showNumberRace(1, 2, 42, 4);

async function showNumberAll(num1, num2, num3, num4) {

  const numP1 = fetch(`${URL_NUMBERS_API}/${num1}?json`);
  const numP2 = fetch(`${URL_NUMBERS_API}/${num2}?json`);
  const numP3 = fetch(`${URL_NUMBERS_API}/${num3}?json`);
  const numP4 = fetch(`${URL_NUMBERS_API}/${num4}?json`);

  const resps = await Promise.allSettled([numP1, numP2, numP3, numP4]);

  for (const resp of resps) { }

  const numTrivia = await resps.json();

  const numTriviaText = numTrivia.text;
  console.log({ numTriviaText });

  return numTrivia;
}

showNumberAll(1, 2, "wrong", 4);