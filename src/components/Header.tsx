import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ModalWithTitle } from "./ui/modals/Modal";

interface Props {
  word: string[];
}
function getRandomNumber(length: number) {
  return Math.floor(Math.random() * length);
}

export default function Header({ word }: Props) {
  const randomIndex = getRandomNumber(word.length);
  const [isActive, setIsActive] = useState(false);

  const [tip, setTip] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openOnDeleteModal = () => setIsModalVisible(true);
  useEffect(() => {
    setTip(word.join(""));
  }, []);

  return (
    <>
      <header className="relative mt-4 flex items-center justify-center gap-10 py-0 font-header text-lg font-extrabold md:text-3xl lg:text-3xl">
        <div className="relative">
          <span
            className={`absolute -left-36 top-1/2 -translate-y-1/2 text-center font-sans text-3xl font-extrabold uppercase tracking-wider dark:text-slate-400
        ${isActive ? "block" : "hidden"}`}
          >
            {isActive &&
              tip &&
              tip
                .split("")
                .map((character, index) => (
                  <span key={index}>
                    {index === randomIndex ? character : " _ "}
                  </span>
                ))}
          </span>
          <span className="absolute -right-[300px] top-1/2 -translate-y-1/2 text-center font-sans text-3xl font-extrabold uppercase tracking-wider dark:text-slate-400">
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
        <h1 className="tracking-wider text-purpleBackGround dark:text-slate-400">
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
        title="TEST MODAL"
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        footer={<>TEST BUTTON</>}
      >
        Wordle es un rompecabezas de palabras divertido y agradable que
        cualquiera puede jugar. Instrucciones:\n- Objetivo: El objetivo de
        Wordle es adivinar una palabra oculta de cinco letras.\n- Adivinar:
        Tienes seis intentos para adivinar la palabra correcta.\n- Haciendo
        Adivinanzas: Envía una palabra de cinco letras y presiona enter.\n-
        Retroalimentación: Después de cada intento, Wordle marca las letras
        correctas en la posición correcta en verde. Las letras correctas en la
        posición incorrecta se marcan en amarillo. Las letras incorrectas se
        marcan en gris.\n- Ajustar Estrategia: Usa la retroalimentación para
        ajustar tu estrategia y acercarte a la palabra correcta.\n- Ganar: Si
        adivinas la palabra dentro de seis intentos, ¡ganas! De lo contrario,
        Wordle revela la palabra correcta.
      </ModalWithTitle>
    </>
  );
}
