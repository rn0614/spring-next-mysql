import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import { queryClient as QueryClient } from "@/utils/react-query/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import Loading from "@/ui/atom/Loading/Loading";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import LoginProvider from "@/components/LoginProvider/LoginProvider";
import { initMsw } from "@/mocks";

//mocking 적용

//initMsw()

const queryClient = QueryClient;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CookiesProvider>
          <ToastProvider/>
          <LoginProvider/>
            <Component {...pageProps} />
            <ReactQueryDevtools />
            <div id="portal">
              <Loading />
            </div>
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
