interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="h-screen w-screen bg-gradient-to-br from-slate-300 via-gray-200 to-gray-400">
      {children}
    </main>
  );
}
