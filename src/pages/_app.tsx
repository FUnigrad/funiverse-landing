import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "@next/font/google";
import "assets/styles/globals.scss";
import { Layout } from "layout";
import type { AppProps } from "next/app";
import { theme } from "theme";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
          background-image: url("https://img.freepik.com/premium-photo/top-view-background-image-minimal-white-workplace-with-laptop-notebook-copy-space_236854-35018.jpg?w=1060");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
