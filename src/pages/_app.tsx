import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "assets/styles/globals.scss";
import { AuthProvider } from "contexts";
import { Layout } from "layout";
import type { AppProps } from "next/app";
import { theme } from "theme";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700", "900"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
