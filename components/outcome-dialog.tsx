"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type DialogProps = {
  outcome?: string;
  word: string;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  initializeGame: () => void;
};

export function OutcomeDialog({
  dialogOpen,
  setDialogOpen,
  outcome,
  word,
  initializeGame,
}: DialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="hidden"></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">
            {outcome === "win" ? "Congrats!🥳" : "Game Over! 😔"}
          </DialogTitle>
          <DialogDescription className="text-left text-gray-400">
            {outcome === "win" ? (
              <>
                You won! The word was{" "}
                <span className="text-lg font-semibold text-white uppercase">
                  {word}
                </span>
              </>
            ) : (
              <>
                You lost! The word was{" "}
                <span className="text-lg font-semibold text-white uppercase">
                  {word}
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <Button
          className="mx-auto w-40 cursor-pointer rounded-md bg-[#1b1b1b] py-2 hover:bg-[#1b1b1b]/80"
          onClick={() => initializeGame()}
        >
          Play again
        </Button>
      </DialogContent>
    </Dialog>
  );
}
