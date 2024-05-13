"use strict";

const URL_NUMBERS_API = "http://numbersapi.com";

/** Get trivia information from Numbers API about num
 *
 * Log out trivia text.
 *
 * Trivia info ex for num 42:
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

  // Log out the trivia fact of the num
  console.log(numTrivia.text);

  // Return json
  return numTrivia;
}

showNumberTrivia(42);