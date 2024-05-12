import React, { ReactNode } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import styles from "./style.module.scss";

type LayoutProps = {
  path: string;
  children: ReactNode;
};

export default function MainLayout({ path, children }: LayoutProps) {
  return (
    <main id={styles["grid"]}>
      <Header path={path} />
      <div className="contents-wrapper">{children}</div>
      <Footer />
    </main>
  );
}
