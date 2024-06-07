import { useSetLoginUser } from "@/hooks/useLogin";
import Button from "@/ui/atom/Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./style.module.scss";
import InputBox from "../InputBox";
import { useRouter } from "next/navigation";
import { MAIN_PATH } from "@/constants";

type inputDataType = {
  email: string;
  password: string;
};

export default function SignInCard({ setIsSigned }: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<inputDataType>();
  const setUser = useSetLoginUser();

  const submitHandler: SubmitHandler<inputDataType> = async (data) => {
    setUser(data);
    router.push(MAIN_PATH());
  };

  const onSignUpLinkClickHandler = () => {
    setIsSigned(false);
  };

  return (
    <form
      className={style["auth-card-box"]}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={style["auth-card-top"]}>
        <div className={style["auth-card-title-box"]}>
          <div className={style["auth-card-title"]}>{"로그인"}</div>
        </div>
        <InputBox
          name="email"
          id="email"
          label="이메일"
          type="text"
          placeholder="example@naver.com"
          error={errors.email}
          register={register}
        ></InputBox>
        <InputBox
          name="password"
          id="password"
          label="비밀번호"
          type="password"
          placeholder="********"
          error={errors.password}
          register={register}
        ></InputBox>
      </div>
      <div className={style["auth-card-bottom"]}>
        <div className={style["auth-sign-in-error-box"]}>
          <div className={style["auth-sign-in-error-message"]}></div>
        </div>
        <Button color="black" type="submit" disabled={isSubmitting}>
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
    </form>
  );
}
