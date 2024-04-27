import { CurrUserAtom } from "@/stores/login-user.store";
import authFetch from "@/utils/axios/axiosInstance";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useLoginCookies } from "./useLoginCookies";

const SIGN_IN_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/auth/sign-in`;
const GET_SING_IN_USER_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/user`;

// 아이디 비번을 통해 유저 로그인
export const signInRequest = async (requestBody: any) => {
  try {
    const response = await axios.post(SIGN_IN_URL(), requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 쿠키의 토큰을 통해 user가 실제로 인가된 유저인지 확인
const getSignInUserRequest = async (accessToken: string) => {
  if (
    accessToken !== "undefined" &&
    accessToken !== undefined &&
    accessToken !== null
  ) {
    try {
      const response = await authFetch(accessToken).get(GET_SING_IN_USER_URL());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

// accessToken을 이용해 새로고침 이후 recoil 데이터 유지 및
export const useGetLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(CurrUserAtom);
  const [cookies, setCookies, removeCookie] = useCookies();
  const { setLoginCookie } = useLoginCookies();
  const { data } = useQuery(
    "accessToken",
    () => getSignInUserRequest(cookies.accessToken),
    {
      onSuccess: (response) => {
        setLoginCookie(response);
        if (cookies.accessToken) {
          setLoginUser({
            email: response.email,
            nickname: response.nickname,
            profileImage: response.profileImage,
          });
        } else {
          setLoginUser(null);
        }
      },
      onError: (error) => {},
    }
  );
  const resetUser = () => {
    setLoginUser(null);
    removeCookie("accessToken", { path: "/" });
  };
  return { loginUser, resetUser };
};

// 로그인 아이디비번 로그인 => token 발번
export const useSetLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(CurrUserAtom);
  const { setLoginCookie } = useLoginCookies();
  const { mutate } = useMutation(signInRequest, {
    onSuccess: async (response) => {
      setLoginCookie(response);
      const result = await getSignInUserRequest(response.token); // 해당 토큰 => 유저정보 Fn
      setLoginUser({
        email: result.email,
        nickname: result.nickname,
        profileImage: result.profileImage,
      });
    },
  });
  return mutate;
};
