"use client";

import { Rules } from "@/components/rules";
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

      if (activeRow === 4 && matrix[activeRow].guess.join("") !== word) {
        setGameOver(true);
        alert("Game over");
        return;
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
    <div className="flex flex-col gap-4">
      <div className="relative flex w-full items-center justify-between">
        <h1 className="flex items-center gap-2 text-left text-6xl font-extralight">
          Wordle <span className="text-3xl">🧩📘</span>{" "}
        </h1>
        <Rules />
      </div>

      <div className="">
        <p>Can you crack the word in six tries? 🤔</p>
        <p>Give it a shot!</p>
        <p>Start typing!👨🏼‍💻</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-8">
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
                          "flex size-16 items-center justify-center rounded-xl bg-[#1b1b1b] text-2xl font-extrabold uppercase lg:size-20",
                          !el.check &&
                            "shadow-[inset_0px_3px_0px_0px_rgba(0,_0,_0,_1)]",
                          el.check &&
                            "bg-[linear-gradient(170deg,_rgba(17,17,17,1)_0%,_rgba(59,59,59,1)_30%,_rgba(59,59,59,1)_70%,_rgba(17,17,17,1)_100%)] shadow-[inset_0px_4px_0px_0px_rgba(255,_255,_255,_0.190)]",
                          (() => {
                            if (!el.check) return "";

                            const letterCount =
                              word.split(el.guess[id]).length - 1;

                            const lettersSoFar = el.guess
                              .slice(0, id + 1)
                              .filter(
                                (letter) => letter === el.guess[id],
                              ).length;

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
                          })(),
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
    </div>
  );
}
