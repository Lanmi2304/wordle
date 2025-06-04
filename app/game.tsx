"use client";

import { cn } from "@/utils/cn";
import { words } from "@/utils/wordd-list";
import { useEffect, useState } from "react";

type RowInfo = {
  check: boolean;
  guess: string[];
};

const randomIndex = Math.floor(Math.random() * (words.length + 1));

export function Game() {
  const [matrix, setMatrix] = useState<RowInfo[]>([
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
  ]);

  const [activeRow, setActiveRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const word = words[randomIndex];
  // Test
  // const word = "truck";
  console.log(word);

  const isCorrectHandler = () => {
    if (matrix[activeRow].guess.join("") === word) {
      // alert("You won!");
      setGameOver(true);
      return;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      isCorrectHandler();
      if (matrix[activeRow].guess.length === 5) {
        if (!words.includes(matrix[activeRow].guess.join(""))) {
          alert("word doesnt exist");
          return;
        }
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
                        "rounded-xl bg-[linear-gradient(170deg,_rgba(17,17,17,1)_0%,_rgba(59,59,59,1)_30%,_rgba(59,59,59,1)_70%,_rgba(17,17,17,1)_100%)] shadow-[inset_0px_4px_0px_0px_rgba(255,_255,_255,_0.190)] flex uppercase text-2xl font-extrabold items-center justify-center size-25",
                        (() => {
                          if (!el.check) return "";

                          const letterCount =
                            word.split(el.guess[id]).length - 1;

                          const lettersSoFar = el.guess
                            .slice(0, id + 1)
                            .filter((letter) => letter === el.guess[id]).length;

                          if (
                            word.includes(el.guess[id]) &&
                            lettersSoFar <= letterCount &&
                            el.guess[id] !== word[id]
                          ) {
                            return "bg-[linear-gradient(170deg,rgba(243,155,7,1)_0%,_rgba(234,107,18,1)_30%,_rgba(234,107,18,1)_67%,_rgba(243,155,7,1)_100%)]";
                          }

                          if (el.guess[id] === word[id])
                            return "bg-[linear-gradient(170deg,_rgba(44,184,58,1)_0%,_rgba(3,83,53,1)_30%,_rgba(3,83,53,1)_80%,_rgba(42,129,50,1)_99%)]";

                          return "";
                        })()
                      )}
                    >
                      <span className={cn("text-white")}>{el.guess[id]}</span>
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
