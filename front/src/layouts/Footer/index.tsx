import React from "react";
import styles from "./style.module.scss";
import { IconButton } from "@/ui/atom/Icon/Icon";
import Logo from "@/ui/morecular/Logo/Logo";

export default function Footer() {

  const onInstaIconButtonClickHandler=()=>{
    window.open('https://www.instargram.com')
  }
  const onNaverBlogIconButtonClickHandler=()=>{
    window.open('https://www.instargram.com')
  }

  return (
    <footer id={styles['footer']}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-top"]}>
          <Logo icon="footer-logo-icon"/>
          <div className={styles["footer-link-box"]}>
            <IconButton onButtonClick={onInstaIconButtonClickHandler} icon={"insta-icon"} />
            <IconButton onButtonClick={onNaverBlogIconButtonClickHandler} icon={"naver-blog-icon"} />
          </div>
        </div>
        <div className={styles["footer-bottom"]}>
          <div className={styles["footer-copyright"]}></div>
        </div>
      </div>
    </footer>
  );
}
