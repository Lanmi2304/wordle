"use client";

import { OutcomeDialog } from "@/components/outcome-dialog";
import { Rules } from "@/components/rules";
import { cn } from "@/utils/cn";
import { words } from "@/utils/wordd-list";
import { KeyboardEvent, useEffect, useRef, useState, useCallback } from "react";

type RowInfo = {
  check: boolean;
  guess: string[];
};

const initialInputs: RowInfo[] = [
  { check: false, guess: [] },
  { check: false, guess: [] },
  { check: false, guess: [] },
  { check: false, guess: [] },
  { check: false, guess: [] },
  { check: false, guess: [] },
];

export function Game() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [matrix, setMatrix] = useState<RowInfo[]>(initialInputs);
  const [word, setWord] = useState("");
  const [activeRow, setActiveRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [noWord, setNoWord] = useState<string | undefined>(undefined);
  const [outcome, setOutcome] = useState<"win" | "lose" | undefined>(undefined);

  const [dialogOpen, setDialogOpen] = useState(false);

  // Game init - BUG play again button!
  const initializeGame = useCallback(() => {
    const newRandomIndex = Math.floor(Math.random() * words.length + 1);
    setWord(words[newRandomIndex]);
    setMatrix(JSON.parse(JSON.stringify(initialInputs))); // Deep copy to avoid reference issues
    setActiveRow(0);
    setGameOver(false);
    setNoWord(undefined);
    setOutcome(undefined);
    setDialogOpen(false);
  }, []);

  // Init game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Check for win
  const handleWinCondition = useCallback(() => {
    setOutcome("win");
    setDialogOpen(true);
    setGameOver(true);
  }, []);

  // Check for lose
  const handleLoseCondition = useCallback(() => {
    setOutcome("lose");
    setDialogOpen(true);
    setGameOver(true);
  }, []);

  // Global keydown handler
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent | KeyboardEvent<HTMLInputElement>) => {
      if (gameOver) return;

      if (e.key === "Enter") {
        if (matrix[activeRow].guess.length !== 5) {
          setNoWord("Not enough letters! 😔");
          return;
        }

        const currentGuess = matrix[activeRow].guess.join("");

        if (!words.includes(currentGuess)) {
          setNoWord("Word not in list! 😕");
          return;
        }

        setNoWord(undefined);

        if (currentGuess === word) {
          setMatrix((prev) => {
            const newMatrix = [...prev];
            newMatrix[activeRow] = { ...newMatrix[activeRow], check: true };
            return newMatrix;
          });
          handleWinCondition();
          return;
        }

        setMatrix((prev) => {
          const newMatrix = [...prev];
          newMatrix[activeRow] = { ...newMatrix[activeRow], check: true };
          return newMatrix;
        });

        if (activeRow < initialInputs.length - 1) {
          setActiveRow((prev) => prev + 1);
        } else {
          handleLoseCondition();
        }
        return;
      }

      if (e.key === "Backspace") {
        setMatrix((prev) => {
          const newMatrix = [...prev];
          newMatrix[activeRow] = {
            check: false,
            guess: newMatrix[activeRow].guess.slice(0, -1),
          };
          return newMatrix;
        });
        setNoWord(undefined);
        return;
      }

      if (e.key.match(/^[a-zA-Z]$/) && matrix[activeRow].guess.length < 5) {
        setMatrix((prev) => {
          const newMatrix = [...prev];
          newMatrix[activeRow] = {
            check: false,
            guess: [...newMatrix[activeRow].guess, e.key.toLowerCase()],
          };
          return newMatrix;
        });
      }
    },
    [
      activeRow,
      matrix,
      word,
      gameOver,
      handleWinCondition,
      handleLoseCondition,
    ],
  );

  useEffect(() => {
    if (!gameOver) {
      document.addEventListener("keydown", handleKeyDown as EventListener);
    } else {
      document.removeEventListener("keydown", handleKeyDown as EventListener);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [handleKeyDown, gameOver]);

  // Mobile purpose !
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeRow, matrix, gameOver]);

  console.log("Target Word:", word);
  console.log("Active Row:", activeRow + 1);
  console.log("Game Over:", gameOver);
  console.log("Outcome:", outcome);

  return (
    <>
      {/* TODO: FIX BUG  */}
      <OutcomeDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        initializeGame={initializeGame}
        word={word}
        outcome={outcome}
      />

      <div className="relative -top-10 flex flex-col gap-4 lg:top-0">
        <div className="relative flex w-full items-center justify-between">
          <h1 className="flex items-center gap-2 text-left text-6xl font-extralight">
            Wordle <span className="text-3xl">🧩📘</span>{" "}
          </h1>
          <Rules />
        </div>

        <div className="">
          <p>Can you crack the word in six tries? 🤔</p>
          <p>Give it a shot!🫵🏼</p>
          <p>Start typing!👨🏼‍💻</p>
        </div>

        {/* TODO: Better solution, maybe tooltip on each row */}
        {noWord && <p className="text-red-400">{noWord}</p>}

        <div
          className="relative flex w-full flex-col items-center justify-center gap-8"
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoFocus
            className="absolute opacity-0"
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />

          {/*  Board render */}
          <div className="grid gap-2">
            {matrix.map((el, idx) => {
              return (
                <div key={idx} className="flex gap-2">
                  {Array.from({ length: 5 }, (_, id) => {
                    // Each letter
                    const guessedLetter = el.guess[id];
                    const targetLetter = word[id];
                    const isChecked = el.check;

                    let bgColorClass = "";
                    if (isChecked) {
                      if (guessedLetter === targetLetter) {
                        // Green
                        bgColorClass =
                          "bg-[linear-gradient(170deg,_rgba(44,184,58,1)_0%,_rgba(3,83,53,1)_30%,_rgba(3,83,53,1)_80%,_rgba(42,129,50,1)_99%)]";
                      } else if (word.includes(guessedLetter)) {
                        // Yellow
                        const wordLetterCount =
                          word.split(guessedLetter).length - 1;
                        const guessedLetterCountInRow = el.guess
                          .slice(0, id + 1)
                          .filter((letter) => letter === guessedLetter).length;

                        if (guessedLetterCountInRow <= wordLetterCount) {
                          bgColorClass =
                            "bg-[linear-gradient(170deg,rgba(243,155,7,1)_0%,_rgba(234,107,18,1)_30%,_rgba(234,107,18,1)_67%,_rgba(243,155,7,1)_100%)]";
                        }
                      }

                      if (!bgColorClass) {
                        // Default
                        bgColorClass =
                          "bg-[linear-gradient(170deg,_rgba(17,17,17,1)_0%,_rgba(59,59,59,1)_30%,_rgba(59,59,59,1)_70%,_rgba(17,17,17,1)_100%)] shadow-[inset_0px_4px_0px_0px_rgba(255,_255,_255,_0.190)]";
                      }
                    } else {
                      bgColorClass =
                        "shadow-[inset_0px_3px_0px_0px_rgba(0,_0,_0,_1)] bg-[#1b1b1b]";
                    }

                    return (
                      <div
                        key={id}
                        className={cn(
                          "flex size-12 items-center justify-center rounded-xl text-2xl font-extrabold uppercase lg:size-18",
                          bgColorClass,
                        )}
                      >
                        <span className={cn("text-white")}>
                          {guessedLetter}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
