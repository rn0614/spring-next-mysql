import { useState } from "react";
import styles from "./style.module.scss";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import SignInCard from "@/components/SignInCard";
import SignUpCard from "@/components/SignUpCard";

export default function AuthPage() {
  const [isSigned, setIsSigned] = useState<boolean>(true);
  return (
    <MainLayout path="">
      <article id={styles["auth-wrapper"]}>
        <div className={styles["auth-container"]}>
          <div className={styles["auth-jumbotron-box"]}>
            <div className={styles["auth-jumbotron-contents"]}>
              <div className={styles["auth-logo-icon"]}></div>
              <div className={styles["auth-jumbotron-text-box"]}>
                <div className={styles["auth-jumbotron-text"]}>환영합니다</div>
                <div
                  className={styles["auth-jumbotron-text"]}
                >{`Koo's Baord입니다`}</div>
              </div>
            </div>
          </div>
          <div className={styles["auth-card"]}>
            {isSigned ? <SignInCard setIsSigned={setIsSigned} /> : <SignUpCard setIsSigned={setIsSigned}/>}
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
