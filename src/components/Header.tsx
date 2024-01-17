import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="font-header mt-4 flex items-baseline justify-center gap-10 py-0 text-lg font-extrabold md:text-3xl lg:text-3xl">
      <article className="relative">
        <h1 className="text-purpleBackGround tracking-wider dark:text-slate-400">
          Wordle
        </h1>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2">
          <ThemeSwitcher />
        </div>
      </article>
    </header>
  );
}
