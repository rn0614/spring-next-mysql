import { MAIN_PATH } from "@/constants";
import { signUpRequest } from "@/hooks/useUser";
import Button from "@/ui/atom/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckBox from "../CheckBox/CheckBox";
import InputBox from "../InputBox";
import style from "./style.module.scss";

type inputDataType = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  telNumber: string;
  address: string;
  addressDetail: string;
  agreedPersonal: boolean;
};

export default function SignUpCard({ setIsSigned }: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<inputDataType>();

  const submitHandler: SubmitHandler<inputDataType> = async (data) => {
    console.log("회원가입 버튼 클릭");
    await signUpRequest(data);
    router.push(MAIN_PATH());
  };

  const [page, setPage] = useState<number>(1);

  const [viewPassword, setViewPassword] = useState<"password" | "text">(
    "password"
  );
  const [passwordIcon, setPasswordIcon] =
    useState<string>("eye-light-off-icon");

  const onNextStepButtonClickHandler = () => {
    setPage(2);
  };

  const onPrevStepButtonClickHandler = () => {
    setPage(1);
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

  return (
    <form
      className={style["auth-card-box"]}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={style["auth-card-top"]}>
        <div className={style["auth-card-title-box"]}>
          <div className={style["auth-card-title"]}>{"회원가입"}</div>
          <div className={style["auth-card-page"]}>{`${page}/2`}</div>
        </div>
        <div className={page === 1 ? style["form-box"] : style["check-done"]}>
          <InputBox
            id="email"
            label="이메일"
            type="text"
            placeholder="example@naver.com"
            error={errors.email}
            register={register}
            required={true}
            pattern={{
              value: /^\S+@\S+\.\S+$/,
              message: "유효한 이메일 형식이 아닙니다",
            }}
          />

          <InputBox
            id="password"
            label="비밀번호"
            type={viewPassword}
            placeholder="***********"
            error={errors.password}
            register={register}
            required={true}
            minLength={{
              value: 5,
              message: "비밀번호는 최소 5자리 이상이어야 합니다.",
            }}
            icon={passwordIcon}
            onButtonClick={onPasswordButtonClickHandler}
          />

          <InputBox
            id="passwordCheck"
            label="비밀번호 확인"
            type={viewPassword}
            placeholder="***********"
            error={errors.passwordCheck}
            register={register}
            required={true}
            minLength={{
              value: 5,
              message: "비밀번호 확인은 최소 5자리 이상이어야 합니다.",
            }}
            icon={passwordIcon}
            onButtonClick={onPasswordButtonClickHandler}
          />
        </div>

        {page === 2 && (
          <div className={style["form-box"]}>
            <InputBox
              id="nickname"
              name="nickname"
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              error={errors.nickname}
              register={register}
              required={true}
            />

            <InputBox
              id="telNumber"
              label="핸드폰번호"
              type="text"
              placeholder="핸드폰번호를 입력해주세요"
              error={errors.telNumber}
              register={register}
              required={true}
            />

            <InputBox
              id="address"
              label="주소"
              type="text"
              placeholder="주소를 입력해주세요"
              error={errors.address}
              register={register}
            />

            <InputBox
              id="addressDetail"
              label="상세주소"
              type="text"
              placeholder="상세주소를 입력해주세요"
              error={errors.addressDetail}
              register={register}
            />

            <CheckBox
              name="agreedPersonal"
              id="agreedPersonal"
              label="개인정보 수집 동의"
              error={errors.agreedPersonal}
              checked={watch("agreedPersonal")}
              register={register}
            />
          </div>
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
            <Button color="black" onClick={onPrevStepButtonClickHandler}>
              이전단계
            </Button>
            <Button color="black" type="submit" disabled={isSubmitting}>
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
    </form>
  );
}
