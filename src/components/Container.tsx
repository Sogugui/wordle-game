interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main
      className="flex h-screen w-screen items-start justify-center bg-gradient-to-br 
    from-white via-white to-stone-100
    dark:from-neutral-900 dark:via-zinc-800 dark:to-slate-950
    "
    >
      <section className="w-full">{children}</section>
    </main>
  );
}
