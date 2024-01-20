import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { ModalWithTitle } from "./ui/Modal";
import { Trans, useTranslation } from "next-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import greenKey from "../../public/assets/greenKey.png";
import yellowKey from "../../public/assets/yellowKey.png";
import grayKey from "../../public/assets/grayKey.png";
import { useRouter } from "next/router";
import { Dictionary, getTranslation } from "@/data/dictionary";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
interface Props {
  word: string[];
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
  locale: any;
}

export default function Header({ word, language, setLanguage, locale }: Props) {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  const [tip, setTip] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openOnDeleteModal = () => setIsModalVisible(true);
  useEffect(() => {
    setTip(word.join(""));
  }, []);

  return (
    <>
      <header className=" mt-4 flex w-full items-center justify-center gap-3 py-0">
        <div className="relative">
          <span className="absolute -left-36 top-1/2 -translate-y-1/2 text-center font-sans text-3xl font-extrabold uppercase tracking-wider dark:text-slate-400">
            {word && word}
          </span>

          <Button
            disabled={isActive}
            className="px-[0.36rem]"
            onClick={() => setIsActive(true)}
          >
            {isActive ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        <LanguageSwitcher
          locale={locale}
          language={language}
          setLanguage={setLanguage}
        />
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
        <ul className="list-inside list-disc text-pretty">
          <h3>{getTranslation("HowToPlayInformation", language)}</h3>

          <li>
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayObjectiveSpan", language)}
            </span>{" "}
            {getTranslation("HowToPlayObjective", language)}
          </li>
          <li>
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayGuessingSpan", language)}
            </span>{" "}
            {getTranslation("HowToPlayGuessing", language)}
          </li>
          <li>
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayMakingGuessesSpan", language)}
            </span>{" "}
            {getTranslation("HowToPlayMakingGuesses", language)}
          </li>
          <li>
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayFeedbackSpan", language)}
            </span>{" "}
            {getTranslation("HowToPlayFeedback", language)}
            <ul className="list-inside">
              <section className="flex ">
                <Image width={25} height={20} src={greenKey} alt="green-key" />

                <span className="mr-1">
                  {getTranslation("HowToPlayCorrectAnswers", language)}
                </span>

                <span className="mr-1 font-bold text-greenCenterButton">
                  {getTranslation("HowToPlayCorrectAnswersColor", language)}
                </span>
              </section>
              <section className="flex ">
                <Image width={25} height={30} src={yellowKey} alt="yelow-key" />

                <span className="mr-1">
                  {getTranslation("HowToPlayMissplacedAnswers", language)}
                </span>

                <span className="ml-1 font-bold text-yellowMarginButton ">
                  {getTranslation("HowToPlayMissplacedAnswersColor", language)}
                </span>
              </section>
              <section className="flex ">
                <Image
                  width={25}
                  className=""
                  height={30}
                  src={grayKey}
                  alt="gray-key"
                />
                <span className="ml-1">
                  {getTranslation("HowToPlayIncorrectAnswers", language)}
                </span>

                <span className="ml-1 font-bold text-gray-700">
                  {getTranslation("HowToPlayIncorrectAnswersColor", language)}{" "}
                </span>
              </section>
            </ul>
          </li>
          <li>
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayAdjustingStrategySpan", language)}
            </span>{" "}
            <span>
              {" "}
              {getTranslation("HowToPlayAdjustingStrategy", language)}{" "}
            </span>
          </li>
          <li>
            <span className="font-bold tracking-wide text-indigo-500">
              {getTranslation("HowToPlayWinningSpan", language)}
            </span>{" "}
            {getTranslation("HowToPlayWinning", language)}
          </li>
        </ul>
      </ModalWithTitle>
    </>
  );
}
