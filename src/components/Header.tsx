import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { ModalWithTitle } from "./ui/Modal";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import greenKey from "../../public/assets/greenKey.png";
import yellowKey from "../../public/assets/yellowKey.png";
import grayKey from "../../public/assets/grayKey.png";
import { getTranslation } from "@/data/dictionary";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
interface Props {
  word: string[];
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
  locale: any;
}

export default function Header({ word, language, setLanguage, locale }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [tip, setTip] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    setTip(word.join(""));
  }, []);

  return (
    <div className="lg:-mb-4 lg:pt-2">
      <header className="flex w-full items-center justify-center gap-2  ">
        <div className="relative">
          {/* <span className="absolute -left-36 top-1/2 -translate-y-1/2 text-center font-sans text-3xl font-extrabold uppercase tracking-wider dark:text-slate-400">
            {word && word}
          </span> */}
        </div>
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <h1 className="font-header tracking-wider text-purpleBackGround dark:text-slate-400">
          Wordle
        </h1>
        <ThemeSwitcher />
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => setIsModalVisible(true)}
        >
          <HelpCircle />
        </Button>
      </header>
      <ModalWithTitle
        title={getTranslation("HowToPlayTitle", language)}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        maxWidth="2xl"
      >
        <ul className="list-inside list-disc text-pretty flex flex-col items-start" >
          <h3>{getTranslation("HowToPlayInformation", language)}</h3>

          <li className="text-justify">
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayObjectiveSpan", language)}
            </span>
            {getTranslation("HowToPlayObjective", language)}
          </li>
          <li className="text-justify">
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayGuessingSpan", language)}
            </span>
            {getTranslation("HowToPlayGuessing", language)}
          </li>
          <li className="text-start">
            <span className="font-bold tracking-wide text-indigo-500">
                            {getTranslation("HowToPlayMakingGuessesSpan", language)}
            </span>
            {getTranslation("HowToPlayMakingGuesses", language)}
          </li>
          <li>
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayFeedbackSpan", language)}
            </span>
            {getTranslation("HowToPlayFeedback", language)}
            <ul className="list-inside">
              <section className="flex ">
                <Image 
                width={25}
                 height={20}
                  src={greenKey} alt="green-key"   className="h-[25px]"/>
                  

                 <span className="lg:pl-1">
                  {getTranslation("HowToPlayCorrectAnswers", language)}
                  <span className="ml-[3px] font-bold text-greenCenterButton">
                  {getTranslation("HowToPlayCorrectAnswersColor", language)}
                </span>
                </span>

              
              </section>
              <section className="flex ">
                <Image
                  className="h-[25px]"
                  width={25}
                  height={25}
                  src={yellowKey}
                  alt="yelow-key"
                />

                 <span className="lg:pl-1">
                  {getTranslation("HowToPlayMissplacedAnswers", language)}
                  <span className="ml-[2px] font-bold text-yellowMarginButton ">
                  {getTranslation("HowToPlayMissplacedAnswersColor", language)}
                </span>
                </span>

              
              </section>
              <section className="flex ">
                <Image
                  className="w-[25px] md:w-[25px] "
                  src={grayKey}
                  alt="gray-key"
                />
                <span className="pl-3">
                  {getTranslation("HowToPlayIncorrectAnswers", language)}
                  <span className=" font-bold text-gray-700">
                  {getTranslation("HowToPlayIncorrectAnswersColor", language)}
                </span>
                </span>                
              </section>
            </ul>
          </li>
          <li className="text-justify">
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayAdjustingStrategySpan", language)}
            </span>
            <span>
              
              {getTranslation("HowToPlayAdjustingStrategy", language)}
            </span>
          </li>
          <li className="text-justify">
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayWinningSpan", language)}
            </span>
            {getTranslation("HowToPlayWinning", language)}
          </li>
        </ul>
      </ModalWithTitle>
    </div>
  );
}
