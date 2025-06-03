"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type RowInfo = {
  check: boolean;
  guess: string[];
};

export function Game() {
  const word = "ninja";
  const [matrix, setMatrix] = useState<RowInfo[]>([
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
  ]);

  const [activeRow, setActiveRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const isCorrectHandler = () => {
    if (matrix[activeRow].guess.join("") === word) {
      alert("You won!");
      setGameOver(true);
      return;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      isCorrectHandler();
      if (matrix[activeRow].guess.length === 5) {
        setMatrix((prev) => {
          const newMatrix = [...prev];
          newMatrix[activeRow] = { ...newMatrix[activeRow], check: true };
          return newMatrix;
        });
        setActiveRow((prev) => prev + 1);
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
  };

  useEffect(() => {
    if (window.document && !gameOver) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeRow, matrix]);

  return (
    <div className="flex flex-col gap-8 justify-center  items-center w-full">
      {/* <h1>
        Word: <span className="text-purple-300">{word}</span>
      </h1> */}

      <div className="grid gap-2">
        {matrix.map((el, idx) => {
          {
            return (
              <div key={idx} className="flex gap-2">
                {Array.from({ length: 5 }, (_, id) => {
                  return (
                    <div
                      key={id}
                      className={cn(
                        "bg-white  border-2 flex uppercase text-2xl font-extrabold items-center justify-center text-black size-25",
                        (() => {
                          if (!el.check) return "";

                          const letterCount =
                            word.split(el.guess[id]).length - 1;
                          console.log(letterCount);

                          const lettersSoFar = el.guess
                            .slice(0, 5)
                            .filter((letter) => letter === el.guess[id]).length;

                          if (el.guess[id] === word[id]) return "bg-green-400";

                          if (
                            word.includes(el.guess[id]) &&
                            lettersSoFar <= letterCount &&
                            el.guess[id] !== word[id]
                          ) {
                            return "bg-amber-500";
                          }
                          return "";
                        })()
                      )}
                    >
                      <span className={cn("text-black")}>{el.guess[id]}</span>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
