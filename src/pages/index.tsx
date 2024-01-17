import Head from "next/head";

import Board from "@/components/Key";
import Keyboard from "@/components/Keyboard";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";

type Letterstatus =
  | "empty"
  | "unchecked"
  | "correct"
  | "misplaced"
  | "incorrect";

interface Guess {
  letter: string;
  status: Letterstatus;
}

interface HomeProps {
  word: string;
  words: string[];
}

// const setNestedArray = (
//   array: Guess[][],
//   i: number,
//   j: number,
//   letter: Guess,
// ): Guess[][] => {
//   const newArray = array[i].slice();
//   const newArrays = array.slice();
//   newArray.splice(j, 1, letter);
//   newArrays.splice(i, 1, newArray);
//   return newArrays;
// };

const countOf = (array: Guess[], pred: (x: Guess) => boolean): number => {
  return array.filter(pred).length;
};

const Home: React.FC<HomeProps> = ({ word, words }) => {
  const [guesses, setGuesses] = useState<Guess[][]>(
    Array.from({ length: 6 }, () =>
      Array(5).fill({ letter: "", status: "empty" }),
    ),
  );
  const [letterstatuss, setLetterstatuss] = useState<
    Record<string, Letterstatus>
  >({}); // const [i, setI] = usestatus<number>(0);
  // const [j, setJ] = usestatus<number>(0);
  // const [won, setWon] = usestatus<boolean>(false);

  // const checkGuess = (): Guess[] | undefined => {
  //   const guess = guesses[i].slice().map((g) => g.letter);
  //   if (!words.includes(guess.join(""))) {
  //     alert("Not in word list");
  //     return;
  //   }

  //   const newLetterstatuss: Record<string, Letterstatus> = { ...letterstatuss };
  //   const checkedGuess = guess.map((letter, ind) => {
  //     if (letter === word[ind]) {
  //       newLetterstatuss[letter] = "correct";
  //       return { letter: letter, status: "correct" };
  //     } else if (
  //       word.includes(letter) &&
  //       countOf(guess, (x) => x.letter === letter) <=
  //         countOf(word, (l) => l === letter)
  //     ) {
  //       newLetterstatuss[letter] = "misplaced";
  //       return { letter: letter, status: "misplaced" };
  //     } else {
  //       newLetterstatuss[letter] = "incorrect";
  //       return { letter: letter, status: "incorrect" };
  //     }
  //   });

  //   setLetterstatuss(newLetterstatuss);
  //   return checkedGuess;
  // };

  const handleOnClick = (letter: string): void => {
    // switch (true) {
    //   case won:
    //     break;
    //   case j === 5 && letter === "ENTER":
    //     const checked = checkGuess();
    //     if (checked === undefined) return;
    //     setGuesses([...guesses.slice(0, i), checked, ...guesses.slice(i + 1)]);
    //     if (countOf(checked, (l) => l.status === "correct") === 5) {
    //       setWon(true);
    //     } else {
    //       setI(i + 1);
    //       setJ(0);
    //     }
    //     break;
    //   case j > 0 && (letter === "DELETE" || letter === "Backspace"):
    //     setGuesses(
    //       setNestedArray(guesses, i, j - 1, { letter: "", status: "empty" }),
    //     );
    //     setJ(j - 1);
    //     break;
    //   case i < 6 && j < 5 && letter !== "ENTER" && letter !== "DELETE":
    //     setGuesses(
    //       setNestedArray(guesses, i, j, {
    //         letter: letter,
    //         status: "unchecked",
    //       }),
    //     );
    //     setJ(j + 1);
    //     break;
    //   default:
    //     break;
    // }
  };

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent): void => {
  //     const pressedKey = e.key.toUpperCase();

  //     if (pressedKey >= "A" && pressedKey <= "Z") {
  //       handleOnClick(pressedKey);
  //     } else if (pressedKey === "ENTER") {
  //       handleOnClick("ENTER");
  //     } else if (pressedKey === "DELETE" || pressedKey === "Backspace") {
  //       handleOnClick("DELETE");
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   return function cleanup() {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [handleOnClick]);

  return (
    <>
      <Head>
        <title>Wordle - Next.js</title>
        <meta
          name="description"
          content="Wordle word guessing game made with next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex flex-col gap-2">
        <Header />
        <Board guesses={guesses} />
        <Keyboard letterstatuss={letterstatuss} onClick={handleOnClick} />
      </article>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const language = "en";
  const word: string[] = await axios
    .get(
      `https://random-word-api.herokuapp.com/word?length=5&&lang=${language}`,
    )
    .then(function (response) {
      return response.data;
    });
  return {
    props: {
      word,
    },
  };
}
