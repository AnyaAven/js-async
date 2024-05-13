"use strict";

const URL_NUMBERS_API = "http://numbersapi.com";

/** Get json trivia information from Numbers API about num */
async function showNumberTrivia(num) {
  const resp = await fetch(`URL_NUMBERS_API/${num}`);
  const numTrivia = resp.json();

  console.log(numTrivia)
  return numTrivia
}