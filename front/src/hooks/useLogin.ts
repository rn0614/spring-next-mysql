import { CurrUserAtom } from "@/stores/login-user.store";
import authFetch from "@/utils/axios/axiosInstance";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useLoginCookies } from "./useLoginCookies";
import { useRouter } from "next/navigation";
import { MAIN_PATH } from "@/constants";
import { toast } from 'react-toastify';

const SIGN_IN_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/auth/sign-in`;
const GET_SING_IN_USER_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/user`;

// 1. id/pw to token
export const signInRequest = async (requestBody: any) => {
  try {
    const response = await axios.post(SIGN_IN_URL(), requestBody);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response;
    }
    return error
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
  const router = useRouter();
  const { setLoginCookie } = useLoginCookies();
  const setRecoilByToken = useSetRecoilByToken();
  const { mutate } = useMutation(signInRequest, {
    onSuccess: async (response) => {
      const responseStatus = response?.status;
      if (response?.code === "SU") {
        setLoginCookie(response);
        await setRecoilByToken(response.token);
        router.push(MAIN_PATH());
      } else if (responseStatus == 401 || responseStatus == 403) {
        toast.error("사용자 정보를 다시 확인바랍니다");
      } else {
        toast.error(`예기치 못한 에러가 발생하였습니다 다시 시도바랍니다. 에러코드: ${responseStatus}`);
      }
    },
  });
  return mutate;
};
