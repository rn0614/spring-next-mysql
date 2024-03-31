import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import Login from "@/components/Commons/Login";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Login>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </Login>
    </RecoilRoot>
  );
}
