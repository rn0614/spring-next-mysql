import { useLoginUserStore } from "@/stores";
import { ReactNode, useEffect } from "react";
import { User } from "@/types/interface";
import { useCookies } from "react-cookie";
import { GetSignInUserResponseDto } from "@/pages/api/response/user";
import { ResponseDto } from "@/pages/api/response";
import { getSignInUserRequest } from "@/pages/api";
import { useRecoilState } from "recoil";
import { CurrUserAtom } from "@/stores/login-user.store";

type LoginProps = {
  children: ReactNode;
};

export default function Login({ children }: LoginProps) {
  const [loginUser, setLoginUser] = useRecoilState(CurrUserAtom);
  
  // state: cookies 상태 //
  const [cookies, setCookies] = useCookies(); // 쿠키에 jwtToken을 저장하는 방법

  const getSignInuserResponse = async (
    responseBody: GetSignInUserResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "AF" || code === "NU" || code === "DBE") {
      setLoginUser(null);
      return;
    }
    console.log('user')
    const loginUserCopy: User = {
      ...(responseBody as GetSignInUserResponseDto),
    };
    setLoginUser(loginUserCopy);
  };

  useEffect(() => {
    if (cookies?.accessToken) {
      getSignInUserRequest(cookies.accessToken).then(getSignInuserResponse);
    }
  }, [cookies.accessToken]);

  return <>{children}</>;
}
