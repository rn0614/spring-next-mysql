import { Html, Head, Main, NextScript } from "next/document";
import Loading from "@/ui/atom/Loading/Loading";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
