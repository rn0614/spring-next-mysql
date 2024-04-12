import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import Login from "@/components/Commons/Login";
import { QueryClientProvider } from "react-query";
import { queryClient as QueryClient } from "@/utils/react-query/queryClient";

const queryClient = QueryClient;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Login>
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </Login>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
