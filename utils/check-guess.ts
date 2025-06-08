import { LetterColor } from "@/app/game";

export function checkGuess(guess: string, targetWord: string): LetterColor[] {
  const guessArray = guess.split("");
  const targetArray = targetWord.split("");
  const result: LetterColor[] = new Array(5).fill(null);

  // Green
  for (let i = 0; i < 5; i++) {
    if (guessArray[i] === targetArray[i]) {
      result[i] = "green";
      targetArray[i] = "#";
    }
  }

  // Yellow
  for (let i = 0; i < 5; i++) {
    if (result[i] === null) {
      const targetIndex = targetArray.indexOf(guessArray[i]);
      if (targetIndex > -1) {
        result[i] = "yellow";
        targetArray[targetIndex] = "#";
      } else {
        result[i] = "gray";
      }
    }
  }

  return result;
}
