import { classNames } from "@/utils/styles";
import React from "react";

interface KeyBoxProps {
  letter: string;
  status: string;
}
enum Statuses {
  "empty",
  "misplaced",
  "correct",
  "incorrect",
}

const KeyBox: React.FC<KeyBoxProps> = ({ letter, status }) => (
  <div
    className={classNames(
      "bg-greyMarginButton flex items-center justify-center  rounded-xl p-5  text-center font-sans text-2xl font-bold lg:h-12 lg:w-12 lg:p-3",
      status === "empty" ? " " : "",
      status === "correct" ? " bg-greenMarginButton " : "",
      status === "misplaced" ? "  bg-yellow-500 text-white" : "",
      status === "incorrect" ? "  bg-gray-600 text-white" : "",
    )}
  >
    <span
      className={classNames(
        "from-greyCenterButton h-full w-full rounded-md bg-gradient-to-b to-slate-400/20",
        status === "empty" ? " " : "",
        status === "correct" ? " bg-greenCenterButton " : "",
        status === "misplaced" ? " bg-yellowCenterButton" : "",
        status === "incorrect" ? " bg-greyCenterButton" : "",
      )}
    >
      {letter}
    </span>
  </div>
);

interface BoardProps {
  guesses: KeyBoxProps[][];
}

const Board: React.FC<BoardProps> = ({ guesses }) => (
  <div className="flex justify-center ">
    <div className="grid w-full grid-cols-1 gap-y-2 lg:w-auto">
      {guesses.map((guess, index) => (
        <div key={index} className="flex justify-center gap-x-1">
          {guess.map(({ letter, status }, guessIndex) => (
            <KeyBox key={guessIndex} letter={letter} status={status} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Board;
