import { useEffect, useState, useContext, useRef, SetStateAction } from "react";
import { Countries, Country } from "@/data/countries";
import { useRouter } from "next/router";

interface LanguageSwitcherProps {
  setLanguage: React.Dispatch<SetStateAction<string>>;
  language: string;
}
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  setLanguage,
}) => {
  const [open, setOpen] = useState(false); //<ul>activation
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeCountry, setActiveCountry] = useState<Country>({
    language: "en",
    flag: "https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png",
    name: {
      en: "English",
      es: "Inglés",
      fr: "Anglais",
      de: "Englisch",
    },
  });

  const handleClick = (country: Country, l?: string) => {
    setActiveCountry(country);
    setOpen(false);
    setLanguage(country.language);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="font- group z-10 rounded-md"
      onClick={() => setOpen(!open)}
    >
      <div className="relative flex items-center justify-start gap-2 rounded-md  px-2 duration-200">
        {/* eslint-disable-next-line */}
        <img
          src={activeCountry.flag}
          alt="changeMe"
          className="h-[30px] w-[32px] max-w-[80px]"
        />
        <span className="font-bold uppercase text-gray-600 dark:text-white dark:group-hover:text-white">
          {language}
        </span>
      </div>
      <ul
        className={`fixed duration-100 ${
          open ? " scale-100" : "scale-0"
        }  mt-1 flex w-[220px] flex-col gap-2 overflow-hidden  rounded-sm border  border-zinc-400/60 bg-gradient-to-br from-white via-gray-200 to-gray-400 p-2 capitalize dark:border-zinc-600/80 dark:from-slate-800 dark:to-neutral-800`}
      >
        {Countries.map((country) => {
          return (
            <li
              key={country.id}
              onClick={() => handleClick(country)}
              className="group z-50 flex w-full items-center justify-start gap-2 border p-3 duration-200 hover:translate-x-1 hover:cursor-pointer hover:border-slate-400 hover:bg-gray-300 dark:hover:border-zinc-500 dark:hover:bg-slate-700"
            >
              {/* eslint-disable-next-line */}
              <img
                src={country.flag}
                alt="changeMe"
                className="h-[40px] w-[40px] max-w-[80px]"
              />
              <span className="text-xl font-extrabold uppercase tracking-widest text-gray-700 dark:text-white">
                {country.name[language]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
