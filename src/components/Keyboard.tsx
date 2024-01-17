import { classNames } from "@/utils/styles";
import { Button } from "./ui/button";
import { Delete } from "lucide-react";

interface KeyboardButtonProps {
  letter: string;
  status: string;
  onClick: (letter: string) => void;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  letter,
  status,
  onClick,
}) => {
  if (letter === "ENTER" || letter === "DELETE") {
    return (
      <button
        onClick={() => onClick(letter)}
        className="to-purpleBackGround from-purpleBackGround col-span-2 flex items-center justify-center rounded-md border-2 bg-gradient-to-br via-violet-800 p-1 font-bold text-white dark:from-slate-700 dark:to-slate-700"
      >
        {letter === "ENTER" ? <Delete size={25} /> : "ENTER"}
      </button>
    );
  } else {
    return (
      <button
        className="flex items-center justify-center rounded-lg border-2 bg-gradient-to-br from-slate-400 to-slate-700 px-2 py-1 text-base font-bold text-white md:text-xl lg:p-1 dark:from-stone-700 dark:via-neutral-600 dark:to-stone-500"
        onClick={() => onClick(letter)}
      >
        {letter}
      </button>
    );
  }
};

interface KeyboardProps {
  letterstatuss: Record<string, string>;
  onClick: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ letterstatuss, onClick }) => {
  const letters = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "ENTER",
    "DELETE",
  ];

  return (
    <section className="flex w-full justify-center ">
      <div className="grid grid-cols-10 gap-1 px-3 md:px-0 lg:gap-0">
        {letters.map((letter) => (
          <KeyboardButton
            key={letter}
            letter={letter}
            status={letterstatuss[letter] ?? "defaultstatus"}
            onClick={onClick}
          />
        ))}
      </div>
    </section>
  );
};
export default Keyboard;
