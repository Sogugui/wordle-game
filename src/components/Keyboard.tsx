import { useEffect } from "react";
import { classNames } from "@/utils/styles";
import { Delete } from "lucide-react";
import { useState } from "react";
import { lettersArray } from "@/data/lettersArrays";
import { KeyboardButtonProps, KeyboardProps } from "@/types/types";

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  letter,
  state,
  onClickLetter,
}) => {
  // This component renders a single KEY to the KEYBOARD
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key.toUpperCase() === letter) {
        setIsTouched(true);
        setTimeout(() => {
          setIsTouched(false);
        }, 100);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (letter === "ENTER" || letter === "DELETE") {
    return (
      <button
        onClick={() => onClickLetter(letter)}
        className={`col-span-2 flex items-center justify-center rounded-md border-2 bg-gradient-to-br from-purpleBackGround via-violet-800 to-purpleBackGround p-1 font-bold text-white transition-all duration-75 ease-in-out active:translate-y-1 dark:from-slate-700 dark:to-slate-700
        ${isTouched ? "translate-y-2 " : "translate-y-0 scale-100"}
        `}
      >
        {letter === "ENTER" ? "ENTER" : <Delete size={25} />}
      </button>
    );
  } else {
    return (
      <button
        className={classNames(
          `flex items-center justify-center rounded-lg border-2 bg-slate-400  px-3 py-2  text-base font-bold text-white transition-all duration-75 ease-in-out active:-translate-y-1 
          dark:from-stone-700 dark:via-neutral-600 dark:to-stone-500 md:text-xl lg:p-1`,
          isTouched ? "translate-y-1 " : "translate-y-0 scale-100",
          state === "unchecked" ? " bg-gray-400 text-black" : "",
          state === "correct" ? " bg-greenMarginButton text-green-900" : "",
          state === "misplaced" ? "  bg-yellow-500 text-yellow-900" : "",
          state === "incorrect" ? "  bg-gray-500 text-neutral-950" : "",
        )}
        onClick={() => onClickLetter(letter)}
      >
        {letter}
      </button>
    );
  }
};

const Keyboard: React.FC<KeyboardProps> = ({
  letterStates,
  onClickLetter,
  wordsArray,
}) => {
  return (
    <section className="flex w-full justify-center ">
      <div className="grid grid-cols-10 gap-1 px-3 md:px-0 lg:gap-0">
        {lettersArray.map((letter) => (
          <KeyboardButton
            key={letter}
            letter={letter}
            state={letterStates[letter] ?? "empty"}
            onClickLetter={onClickLetter}
            wordsArray={wordsArray}
          />
        ))}
      </div>
    </section>
  );
};
export default Keyboard;
