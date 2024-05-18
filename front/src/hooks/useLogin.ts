import { CurrUserAtom } from "@/stores/login-user.store";
import authFetch from "@/utils/axios/axiosInstance";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useLoginCookies } from "./useLoginCookies";

const SIGN_IN_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/auth/sign-in`;
const GET_SING_IN_USER_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/user`;

// 1. id/pw to token
export const signInRequest = async (requestBody: any) => {
  try {
    const response = await axios.post(SIGN_IN_URL(), requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. token to userName/email
export const getSignInUserRequest = async (accessToken: string | undefined) => {
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

// 3. token to LoginRecoil
export const useSetRecoilByToken = () => {
  const [cookies] = useCookies();
  const setLoginUser = useSetRecoilState(CurrUserAtom);
  let userData;
  const setRecoilByToken = async (accessToken: string | undefined) => {
    if (accessToken || cookies?.accessToken) {
      userData = await getSignInUserRequest(
        accessToken || cookies?.accessToken
      );
      if (userData) {
        setLoginUser({
          email: userData.email,
          nickname: userData.nickname,
          profileImage: userData.profileImage,
        });
      }
    } else {
      setLoginUser(null);
    }
  };
  return setRecoilByToken;
};

// 로그인 아이디비번 로그인 => token 발번 => setCookies, setRecoilData
export const useSetLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(CurrUserAtom);
  const { setLoginCookie } = useLoginCookies();
  const setRecoilByToken = useSetRecoilByToken();
  const { mutate } = useMutation(signInRequest, {
    onSuccess: async (response) => {
      setLoginCookie(response);
      await setRecoilByToken(response.token);
    },
  });
  return mutate;
};
