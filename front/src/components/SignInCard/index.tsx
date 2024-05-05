import React, { useState, KeyboardEvent, useRef, ChangeEvent } from "react";
import style from "./style.module.scss";
import InputBox from "../InputBox";
import Button from "@/ui/atom/Button/Button";
import { signInRequest, useSetLoginUser } from "@/hooks/useLogin";
import { SignInRequestDto } from "@/pages/api/request/auth";
import { MAIN_PATH } from "@/constants";
import { useRouter } from "next/navigation";

type inputDataType = {
  email: string;
  password: string;
};

export default function SignInCard({ setIsSigned }: any) {
  const router = useRouter();
  const setUser = useSetLoginUser();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const initInputDate = {
    email: "",
    password: "",
  };
  const [inputData, setInputData] = useState<inputDataType>(initInputDate);
  const [viewPassword, setViewPassword] = useState<"password" | "text">(
    "password"
  );
  const [error, setError] = useState<boolean>(false);
  const [passwordIcon, setPasswordIcon] =
    useState<string>("eye-light-off-icon");

  const onSignInButtonClickHandler = async () => {
    const requestBody: SignInRequestDto = inputData;
    setUser(requestBody);
    router.push(MAIN_PATH());
  };

  const onSignUpLinkClickHandler = () => {
    setIsSigned(false);
  };

  const onPasswordButtonClickHandler = () => {
    if (viewPassword === "text") {
      setViewPassword("password");
      setPasswordIcon("eye-light-off-icon");
    } else {
      setViewPassword("text");
      setPasswordIcon("eye-light-on-icon");
    }
  };
  const onEmailKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!passwordRef.current) return;
    passwordRef.current.focus();
  };

  const onPassowrdKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    onSignInButtonClickHandler();
  };

  const onChangeDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((pre) => {
      return { ...pre, [e.target.name]: e.target?.value };
    });
  };

  return (
    <div className={style["auth-card-box"]}>
      <div className={style["auth-card-top"]}>
        <div className={style["auth-card-title-box"]}>
          <div className={style["auth-card-title"]}>{"로그인"}</div>
        </div>
        <InputBox
          name="email"
          label="이메일 주소"
          type="text"
          placeholder="이메일 주소를 입력해주세요"
          error={error}
          value={inputData.email}
          ref={emailRef}
          onChange={onChangeDataHandler}
          onKeyDown={onEmailKeyDownHandler}
        />
        <InputBox
          name="password"
          label="비밀번호"
          type={viewPassword}
          placeholder="비밀번호를 입력해주세요"
          ref={passwordRef}
          error={error}
          value={inputData.password}
          onChange={onChangeDataHandler}
          icon={passwordIcon}
          onButtonClick={onPasswordButtonClickHandler}
          onKeyDown={onPassowrdKeyDownHandler}
        />
      </div>
      <div className={style["auth-card-bottom"]}>
        <div className={style["auth-sign-in-error-box"]}>
          <div className={style["auth-sign-in-error-message"]}>
            {error
              ? "이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신내용을 다시 확인 부탁드립니다"
              : null}
          </div>
        </div>
        <Button color="black" onClick={onSignInButtonClickHandler}>
          로그인
        </Button>
        <div className={style["auth-description-box"]}>
          <div className={style["auth-description"]}>
            {"신규 사용자이신가요?"}
            <span
              className={style["auth-description-link"]}
              onClick={onSignUpLinkClickHandler}
            >
              {"회원가입"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
