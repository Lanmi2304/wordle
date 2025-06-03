"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type RowInfo = {
  check: boolean;
  guess: string[];
};

// word.

export function Game() {
  const word = "apple";
  const [matrix, setMatrix] = useState<RowInfo[]>([
    // ["a", "b", "c", "d", "e"],
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
    { check: false, guess: [] },
  ]);

  //   const [guess, setGuess] = useState("");
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
      //   console.log(matrix[activeRow].guess);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeRow, matrix]);

  //   useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-8 justify-center mt-20 items-center w-full">
      <h1>
        Word: <span className="text-purple-300">{word}</span>
      </h1>
      {/* <h2>Guess: {guess}</h2>a */}
      <div className="grid gap-2">
        {/* {matrix.map((el, idx) => (
        <div key={idx} className="size-25 bg-white"></div>
      ))} */}
        {matrix.map((el, idx) => {
          {
            return (
              <div key={idx} className="flex gap-2">
                {Array.from({ length: 5 }, (_, id) => {
                  return (
                    <div
                      key={id}
                      className={cn(
                        "bg-gray-600  flex uppercase text-2xl font-extrabold items-center justify-center text-black size-25",
                        word.includes(el.guess[id]) &&
                          el.check &&
                          "bg-yellow-500",
                        el.guess[id] === word[id] && el.check && "bg-green-700"
                      )}
                    >
                      <span
                        className={cn(
                          "text-white"
                          //   word.includes(el.guess[id]) && "text-purple-700"
                        )}
                      >
                        {el.guess[id]}
                      </span>
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
