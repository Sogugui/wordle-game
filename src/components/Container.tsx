interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main
      className="dark:to-slate- flex h-screen w-screen items-start justify-center 
    overflow-hidden bg-gradient-to-br from-white
    via-white to-stone-100 dark:from-neutral-900 dark:via-zinc-800
    "
    >
      <section className="w-full">{children}</section>
    </main>
  );
}
