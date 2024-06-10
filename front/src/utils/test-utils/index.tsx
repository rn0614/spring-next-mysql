import { RecoilRoot } from "recoil";
import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { generateQueryClient } from "../react-query/queryClient";
import { CookiesProvider } from "react-cookie";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import LoginProvider from "@/components/LoginProvider/LoginProvider";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

//test 전에 QueryClient 생성으로 에러 막음.
export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CookiesProvider>
          <ToastProvider />
          <LoginProvider />
          {ui}
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
