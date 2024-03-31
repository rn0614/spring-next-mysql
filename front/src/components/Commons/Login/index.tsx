import { useLoginUserStore } from "@/stores";
import { ReactNode, useEffect } from "react";
import { User } from "@/types/interface";
import { useCookies } from "react-cookie";
import { GetSignInUserResponseDto } from "@/pages/api/response/user";
import { ResponseDto } from "@/pages/api/response";
import { getSignInUserRequest } from "@/pages/api";

type LoginProps = {
  children: ReactNode;
};

export default function Login({ children }: LoginProps) {
  const { setLoginUser, resetLoginUser } = useLoginUserStore(); // 전역 상태에 loginUser 삽입

  // state: cookies 상태 //
  const [cookies, setCookies] = useCookies(); // 쿠키에 jwtToken을 저장하는 방법

  const getSignInuserResponse = async (
    responseBody: GetSignInUserResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "AF" || code === "NU" || code === "DBE") {
      resetLoginUser();
      return;
    }
    const loginUserCopy: User = {
      ...(responseBody as GetSignInUserResponseDto),
    };
    await setLoginUser(loginUserCopy);
  };

  useEffect(() => {
    getSignInUserRequest(cookies.accessToken).then(getSignInuserResponse);
  }, [cookies.accessToken]);

  return <>{children}</>;
}
