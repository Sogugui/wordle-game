import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import Container from "@/components/Container";

import { Permanent_Marker } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const PermanentMarker = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

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

export default api.withTRPC(MyApp);
