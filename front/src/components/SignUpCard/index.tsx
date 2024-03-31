import React, { useState, KeyboardEvent, useRef, ChangeEvent } from "react";
import style from "./style.module.scss";
import InputBox from "../InputBox";
import Button from "@/ui/atom/Button/Button";
import { signUpRequest } from "@/pages/api";
import { SignUpRequestDto } from "@/pages/api/request/auth";
import { useCookies } from "react-cookie";
import { MAIN_PATH } from "@/constants";
import { useRouter } from "next/navigation";
import Icon from "@/ui/atom/Icon/Icon";

type inputDateType = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  telNumber: string;
  address: string;
  addressDetail: string;
  agreedPersonal: boolean;
};

export default function Authentication({ setIsSigned }: any) {
  const router = useRouter();

  const [cookies, setCookies] = useCookies();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const telNumberRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const addressDetailRef = useRef<HTMLInputElement | null>(null);

  const [page, setPage] = useState<number>(1);

  const initInputDate = {
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    telNumber: "",
    address: "",
    addressDetail: "",
    agreedPersonal: false,
  };
  const [inputData, setInputData] = useState<inputDateType>(initInputDate);

  const onChangeDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((pre) => {
      return { ...pre, [e.target.name]: e.target?.value };
    });
  };

  const onCheckingDataHandler = () => {
    setInputData((pre) => {
      return { ...pre, ["agreedPersonal"]: !pre.agreedPersonal };
    });
  };

  const [viewPassword, setViewPassword] = useState<"password" | "text">(
    "password"
  );
  const [error, setError] = useState<boolean>(false);
  const [passwordIcon, setPasswordIcon] =
    useState<string>("eye-light-off-icon");

  
  const onNextStepButtonClickHandler = () => {
    setPage(2);
  };
  const onSignUpButtonClickHandler = () => {
    const requestBody: SignUpRequestDto = inputData;
    signUpRequest(requestBody).then(signUpResponse);
  };

  const signUpResponse = (responseBody: any) => {
    if (!responseBody) {
      alert("네트워크 이상");
      return;
    }
    const { code } = responseBody;
    if (code === "DBE") alert("데이터 베이스 오류");
    if (code === "SF" || code === "VF") setError(true);
    if (code !== "SU") return;

    const { token, expirationTime } = responseBody;
    const now = new Date().getTime();
    const expires = new Date(now + expirationTime * 1000);
    setCookies("accessToken", token, { expires: expires, path: MAIN_PATH() });
    router.push(MAIN_PATH());
  };


  const onSignInLinkClickHandler = () => {
    setIsSigned(true);
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
  };

  return (
    <div className={style["auth-card-box"]}>
      <div className={style["auth-card-top"]}>
        <div className={style["auth-card-title-box"]}>
          <div className={style["auth-card-title"]}>{"회원가입"}</div>
          <div className={style["auth-card-page"]}>{`${page}/2`}</div>
        </div>
        {page === 1 && (
          <>
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
            <InputBox
              name="passwordCheck"
              label="비밀번호확인"
              type={viewPassword}
              placeholder="비밀번호를 입력해주세요"
              ref={passwordRef}
              error={error}
              value={inputData.passwordCheck}
              onChange={onChangeDataHandler}
              icon={passwordIcon}
              onButtonClick={onPasswordButtonClickHandler}
              onKeyDown={onPassowrdKeyDownHandler}
            />
          </>
        )}
        {page === 2 && (
          <>
            <InputBox
              name="nickname"
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              error={error}
              value={inputData.nickname}
              ref={nicknameRef}
              onChange={onChangeDataHandler}
              onKeyDown={onEmailKeyDownHandler}
            />
            <InputBox
              name="telNumber"
              label="핸드폰번호"
              type="text"
              placeholder="핸드폰번호를 입력해주세요"
              error={error}
              value={inputData.telNumber}
              ref={telNumberRef}
              onChange={onChangeDataHandler}
              onKeyDown={onEmailKeyDownHandler}
            />
            <InputBox
              name="address"
              label="주소"
              type="text"
              placeholder="주소를 입력해주세요"
              error={error}
              value={inputData.address}
              ref={addressRef}
              onChange={onChangeDataHandler}
              onKeyDown={onEmailKeyDownHandler}
            />
            <InputBox
              name="addressDetail"
              label="상세주소"
              type="text"
              placeholder="상세주소를 입력해주세요"
              error={error}
              value={inputData.addressDetail}
              ref={addressDetailRef}
              onChange={onChangeDataHandler}
              onKeyDown={onEmailKeyDownHandler}
            />
          </>
        )}
      </div>
      <div className={style["auth-card-bottom"]}>
        {page === 1 && (
          <Button color="black" onClick={onNextStepButtonClickHandler}>
            다음단계
          </Button>
        )}
        {page === 2 && (
          <>
            <div className={style["auth-consent-box"]}>
              <Icon
                icon={
                  inputData.agreedPersonal
                    ? "check-round-fill-icon"
                    : "check-ring-light-icon"
                }
                onClick={onCheckingDataHandler}
              />
              <div className={style["auth-consent-title"]}>
                {"개인정보동의"}
              </div>
              <div className={style["auth-consent-link"]}>{"더보기>"}</div>
            </div>
            <Button color="black" onClick={onSignUpButtonClickHandler}>
              제출
            </Button>
          </>
        )}
        <div className={style["auth-description-box"]}>
          <div className={style["auth-description"]}>
            {"이미 계정이 있으신가요?"}
            <span
              className={style["auth-description-link"]}
              onClick={onSignInLinkClickHandler}
            >
              {"로그인"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
