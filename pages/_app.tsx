import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import theme from "@app/modules/theme";
import { SWRConfig } from "swr";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: axios.get,
        onError: (error) => console.error(error),
      }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer position="top-center" />
      </ChakraProvider>
    </SWRConfig>
  );
}
