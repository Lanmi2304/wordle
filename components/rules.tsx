import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function Rules() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Info className="size-8 p-1" />
      </DialogTrigger>
      <DialogContent className="h-[80%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-left">🧩 Wordle Rules</DialogTitle>
          <DialogDescription className="text-left text-gray-400">
            Wordle is a word-guessing game where you have six attempts to find a
            hidden five-letter English word. After each guess, the game gives
            you color-coded feedback to help you get closer to the correct
            answer.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            1. Guess the Word in 6 Tries
          </h3>
          <p className="text-gray-400">
            You have 6 attempts to guess the hidden 5-letter word.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            2. Valid 5-Letter Words Only
          </h3>
          <p className="text-gray-400">
            Each guess must be a valid English word with exactly 5 letters.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            3. Color Feedback After Each Guess
          </h3>
          <p className="text-gray-400">
            After submitting a guess, each letter will be highlighted to give
            you clues:
          </p>
          <ul className="flex flex-col gap-2">
            <li className="text-gray-400">
              🟩 Green: The letter is in the word and in the correct position.
            </li>
            <li className="text-gray-400">
              🟨 Yellow: The letter is in the word but in the wrong position.
            </li>
            <li className="text-gray-400">
              ⬜ Gray: The letter is not in the word at all.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            4. Letters Can Appear More Than Once
          </h3>
          <p className="text-gray-400">
            The same letter may appear multiple times in the word.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">5. Use Clues Wisely</h3>
          <p className="text-gray-400">
            Use the feedback from each guess to narrow down possibilities and
            find the correct word within 6 tries.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
