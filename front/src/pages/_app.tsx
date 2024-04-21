import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import { queryClient as QueryClient } from "@/utils/react-query/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = QueryClient;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CookiesProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
