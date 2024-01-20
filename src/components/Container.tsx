interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main
      className=" dark:to-slate- flex h-screen w-screen items-start justify-center overflow-hidden 
    bg-gradient-to-br from-white via-white
    to-stone-100 dark:from-neutral-900 dark:via-zinc-800 lg:scale-100
    "
    >
      <div className="flex h-screen w-full flex-col justify-center lg:pb-10  ">
        {children}
      </div>
    </main>
  );
}
