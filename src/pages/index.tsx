import Head from "next/head";
import { HelpCircle } from "lucide-react";
import Board from "@/components/Key";
import Keyboard from "@/components/Keyboard";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
// import { GetServerSideProps, GetStaticProps } from "next";

export type LetterState =
  | "correct"
  | "misplaced"
  | "incorrect"
  | "empty"
  | "unchecked";

export type Guess = {
  letter: string;
  state: LetterState;
};

type HomeProps = {
  wordsArray: string[];
};

function setNestedArray<T>(
  array: T[][],
  col: number,
  row: number,
  value: T,
): T[][] {
  const newArray = array[col]?.slice() || [];
  const newArrays = array.slice();
  newArray.splice(row, 1, value);
  newArrays.splice(col, 1, newArray);
  return newArrays;
}

function countOf<T>(array: T[], predicate: (item: T) => boolean): number {
  return array.filter(predicate).length;
}

const Home: React.FC<HomeProps> = ({ wordsArray }) => {
  console.log({ wordsArray });

  const [guesses, setGuesses] = useState<Array<Array<Guess>>>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: "", state: "empty" })),
    ),
  );
  console.log({ guesses });
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>(
    {},
  );
  console.log({ letterStates });
  const [col, setCol] = useState<number>(0);
  console.log({ col });

  const [row, setRow] = useState<number>(0);
  console.log({ row });
  const [won, setWon] = useState<boolean>(false);

  function checkGuess(): Guess[] {
    const guess =
      guesses[col]
        ?.slice()
        .map((g): Guess => ({ letter: g.letter, state: "unchecked" })) || [];

    const newLetterStates: Record<string, LetterState> = { ...letterStates };
    const checkedGuess: Guess[] = guess.map((word, index) => {
      const wordsArrayUpperCase = wordsArray[index]?.toUpperCase();

      if (word.letter === wordsArrayUpperCase) {
        newLetterStates[word.letter] = "correct";
        return { letter: word.letter, state: "correct" };
      } else if (
        wordsArray.includes(word.letter.toLocaleLowerCase()) &&
        countOf(guess, (item) => item.letter === word.letter) <=
          countOf(wordsArray, (l) => l.toUpperCase() === word.letter)
      ) {
        newLetterStates[word.letter] = "misplaced";
        return { letter: word.letter, state: "misplaced" };
      } else {
        newLetterStates[word.letter] = "incorrect";
        return { letter: word.letter, state: "incorrect" };
      }
    });
    setLetterStates(newLetterStates);
    return checkedGuess;
  }

  function handleOnClick(letter: string): void {
    switch (true) {
      case won:
        break;
      case row === 5 && letter === "ENTER":
        const checked = checkGuess();
        if (checked.length === 0) return;
        setGuesses([
          ...guesses.slice(0, col),
          checked,
          ...guesses.slice(col + 1),
        ]);

        if (countOf(checked, (l) => l.state === "correct") === 5) {
          setWon(true);
        } else {
          setCol(col + 1);
          setRow(0);
        }
        break;
      case row > 0 && letter === "DELETE":
        setGuesses(
          setNestedArray(guesses, col, row - 1, {
            letter: "",
            state: "empty",
          }),
        );
        setRow(row - 1);
        break;
      case col < 6 && row < 5 && letter !== "ENTER" && letter !== "DELETE":
        setGuesses(
          setNestedArray(guesses, col, row, { letter, state: "unchecked" }),
        );
        setRow(row + 1);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      // e.key.length === 1 checks if the key is different than a special one like alt, tab, etc
      if (
        e.key.length === 1 &&
        (e.key >= "A" || e.key >= "a") &&
        (e.key <= "Z" || e.key <= "z")
      ) {
        handleOnClick(e.key.toUpperCase());
      } else if (e.key === "Enter") {
        handleOnClick("ENTER");
      } else if (e.key === "Backspace") {
        handleOnClick("DELETE");
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guesses, col, row, won, wordsArray, letterStates]);

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
      <article className="relative flex flex-col gap-2">
        <Header word={wordsArray} />

        <Board guesses={guesses} />
        <Keyboard
          letterStates={letterStates}
          onClickLetter={handleOnClick}
          wordsArray={wordsArray}
        />
      </article>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const getWord = async () => {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5&&lang=en",
    );

    const word = await res.json();
    const wordsArray = word[0].split("");
    return wordsArray;
  };

  const wordsArray: string[] = await getWord();

  return {
    props: {
      wordsArray,
    },
  };
};

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, [
//         'common',
//         'footer',
//       ])),
//       // Will be passed to the page component as props
//     },
//   }
// }
