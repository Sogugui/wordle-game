import { type AppType } from "next/app";

import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import Container from "@/components/Container";
import { ThemeProvider } from "@/components/ThemeProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Container>
        <ToastContainer /> <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
};

export default MyApp;
