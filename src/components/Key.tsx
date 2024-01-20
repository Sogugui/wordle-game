import { BoardProps, Guess } from "@/types/types";
import { classNames } from "@/utils/styles";
import React from "react";

const KeyBox: React.FC<Guess> = ({ letter, state }) => (
  <div
    className={classNames(
      "flex h-10 w-10 items-center  justify-center rounded-md bg-greyMarginButton text-center font-sans  font-bold lg:h-12 lg:w-12 lg:rounded-lg lg:p-2 ",
      state === "empty" ? "bg-gray-300 dark:bg-stone-500" : "",
      state === "correct"
        ? "animate-rotate-y bg-greenMarginButton animate-normal animate-duration-300 animate-once animate-ease-in-out"
        : "",
      state === "misplaced"
        ? " animate-wiggle-more bg-yellowMarginButton text-yellow-900 animate-normal animate-duration-300 animate-ease-in-out"
        : "",
      state === "incorrect" ? "bg-slate-400" : "",
    )}
  >
    <span
      className={classNames(
        "flex  h-3/4 w-3/4 items-center justify-center rounded bg-gradient-to-b from-greyCenterButton to-slate-400/20 text-base md:text-xl lg:h-full lg:w-full lg:p-0 lg:px-0",
        state === "empty"
          ? " from-stone-300 to-stone-300 dark:from-stone-400 dark:to-zinc-400"
          : "",
        state === "correct"
          ? " animate-rotate-y from-greenMarginButton to-green-500 text-green-800 animate-normal animate-duration-300 animate-once animate-ease-in-out"
          : "",
        state === "misplaced"
          ? " animate-wiggle from-yellowMarginButton to-yellowCenterButton animate-normal animate-duration-300 animate-ease-in-out"
          : "",
        state === "incorrect"
          ? "from-gray-400 to-slate-300 text-slate-600"
          : "",
      )}
    >
      {letter}
    </span>
  </div>
);

const Board: React.FC<BoardProps> = ({ guesses }) => (
  <div className="flex justify-center ">
    <div className="grid w-full grid-cols-1 gap-y-2 lg:w-auto">
      {guesses.map((guess, index) => (
        <div key={index} className="flex justify-center gap-x-1">
          {guess.map(({ letter, state }, guessIndex) => (
            <KeyBox key={guessIndex} letter={letter} state={state} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Board;
