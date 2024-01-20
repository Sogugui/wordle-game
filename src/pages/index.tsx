import Head from "next/head";
import Board from "@/components/Key";
import Keyboard from "@/components/Keyboard";
import winnerAnimation from "../../public/assets/winner.json";
import lostAmimation from "../../public/assets/youLost.json";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Header from "@/components/Header";
import { ModalWithTitle } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { getTranslation } from "@/data/dictionary";
import { lettersArray } from "@/data/lettersArrays";
import { Guess, HomeProps, LetterState } from "@/types/types";

const Home: React.FC<HomeProps> = ({ locale }) => {
  const [wordsArray, setwordsArray] = useState<string[]>([""]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotWinnerVisible, setIsNotWinnerVisible] = useState(false);
  const [guesses, setGuesses] = useState<Array<Array<Guess>>>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: "", state: "empty" })),
    ),
  );
  console.log({ guesses });
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>(
    {},
  );

  const [col, setCol] = useState<number>(0);
  console.log({ col });
  const [row, setRow] = useState<number>(0);
  console.log({ row });
  const [won, setWon] = useState<boolean>(false);
  console.log({ won });

  const [language, setLanguage] = useState("en");
  const getWord = async () => {
    const res = await fetch(
      `https://random-word-api.herokuapp.com/word?length=5&&lang=${language}`,
    );
    const word = await res.json();
    const wordsUpperCaseArray = word[0].toUpperCase().split("");
    const wordsArray = word[0].split("");

    // Verifies whether words in languages other than English contain special characters such as 'é', 'á', etc.
    const isNotSpecialWord = wordsUpperCaseArray.every((item: string) =>
      lettersArray.includes(item),
    );
    if (isNotSpecialWord) {
      setwordsArray(wordsArray);
    } else {
      console.log("isNotSpecialWord", isNotSpecialWord);
      getWord();
    }
  };

  useEffect(() => {
    getWord();
  }, [language]);

  const handleReload = () => {
    setIsModalVisible(false);
    setIsNotWinnerVisible(false);
    getWord();
    setCol(0);
    setRow(0);
    setGuesses(
      Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({ letter: "", state: "empty" })),
      ),
    );
    if (won === true) {
      setWon(false);
    }
    setLetterStates({});
  };
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
  useEffect(() => {
    if (won === true) setIsModalVisible(true);
    if (col === 6 && won === false) setIsNotWinnerVisible(true);
  }, [won, col]);

  return (
    <div className="flex flex-col  ">
      <Head>
        <title>Wordle</title>
        <meta
          name="description"
          content="Wordle word guessing game made with next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <Header
          locale={locale}
          word={wordsArray}
          language={language}
          setLanguage={setLanguage}
        /> */}
      </Head>
      <div className="flex flex-col gap-5 md:gap-1 lg:gap-1">
        <Header
          locale={locale}
          word={wordsArray}
          language={language}
          setLanguage={setLanguage}
        />

        <Board guesses={guesses} />
        <Keyboard
          letterStates={letterStates}
          onClickLetter={handleOnClick}
          wordsArray={wordsArray}
        />
        <h3 className="text-xl text-red-500"> {locale}</h3>
      </div>

      <ModalWithTitle
        title={getTranslation("UserWinner", language)}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        maxWidth="2xl"
        footer={
          <Button onClick={handleReload}>
            {getTranslation("ResetButton", language)}
          </Button>
        }
        isWinner={won === true}
      >
        <div className="mt-20 lg:mt-0">
          <Player
            autoplay
            loop
            src={winnerAnimation}
            style={{ height: "350px", width: "200px" }}
          />
        </div>
      </ModalWithTitle>
      <ModalWithTitle
        title={getTranslation("UserNotWinner", language)}
        isModalVisible={isNotWinnerVisible}
        setIsModalVisible={setIsNotWinnerVisible}
        maxWidth="2xl"
        footer={
          <Button onClick={handleReload}>
            {getTranslation("TryAgainButton", language)}
          </Button>
        }
      >
        <div className="mt-20 lg:mt-0">
          <p className="px-3 py-1 rounded-lg bg-slate-700 text-white font-medium dark:bg-white dark:text-slate-700">
            {getTranslation("RevealCorrectAswer", language)} <span className="uppercase tracking-wider">{wordsArray}</span>
          </p>
          <Player
            autoplay
            loop
            src={lostAmimation}
            style={{ height: "350px", width: "200px" }}
          />
        </div>
      </ModalWithTitle>
    </div>
  );
};

export default Home;

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
