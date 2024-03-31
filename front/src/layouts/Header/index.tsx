import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import React, { useEffect, useState } from "react";
import SearchButton from "@/ui/morecular/SearchButton/SearchButton";
import Button from "@/ui/atom/Button/Button";
import Icon from "@/ui/atom/Icon/Icon";
import { useLoginUserStore } from "@/stores";
import { USER_PATH } from "@/constants";
import { useRecoilValue } from "recoil";
import { CurrUserAtom } from "@/stores/login-user.store";
import { useCookies } from "react-cookie";

export default function Header() {
  const { setLoginUser, resetLoginUser } = useLoginUserStore();
  const loginUser = useRecoilValue(CurrUserAtom);
  const [cookies, setCookies] = useCookies();

  const router = useRouter();

  const onLogoClickHander = () => {
    router.push("/");
  };

  const onMyPageButtonClickHandler = () => {
    if (!loginUser) return;
    const { nickname } = loginUser;
    router.push(USER_PATH(nickname));
  };

  const onSignInButtonClickHandler = () => {
    router.push("/auth");
  };

  const onLogOutButtonClickHandler = () => {
    setCookies("accessToken", null);  // expires: expires,
    resetLoginUser();
    router.push("/");
  };

  return (
    <header id={styles["header"]} className="header">
      <div className={styles["header-container"]}>
        <div className={styles["header-left-box"]} onClick={onLogoClickHander}>
          <Icon icon="logo-dark-icon" heading={true} />
          <div className={styles["header-log"]}>{"Koo"}</div>
        </div>
        <div className={styles["header-right-box"]}>
          <SearchButton />
          {loginUser ? (
            <>
              <Button color="white" onClick={onMyPageButtonClickHandler}>
                마이페이지
              </Button>
              <Button onClick={onLogOutButtonClickHandler}>로그아웃</Button>
            </>
          ) : (
            <Button onClick={onSignInButtonClickHandler}>로그인</Button>
          )}
        </div>
      </div>
    </header>
  );
}
