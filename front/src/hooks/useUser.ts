import authFetch from "@/utils/axios/axiosInstance";
import { queryClient } from "@/utils/react-query/queryClient";
import axios from "axios";
import { useMutation } from "react-query";
import { SignInRequestDto, SignUpRequestDto } from "@/pages/api/request/auth";
import { ResponseDto } from "@/pages/api/response";
import { GetSignInUserResponseDto } from "@/pages/api/response/user";

const PATCH_NICNAME_URL = () =>
  `${process.env.NEXT_PUBLIC_API_BACK}/user/nickname`;
const PATCH_PROFILEIMAGE_URL = () =>
  `${process.env.NEXT_PUBLIC_API_BACK}/user/profile-image`;
const GET_USER_INFO = (email: string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/user/${email}`;

const SIGN_UP_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/auth/sign-up`;
const GET_SING_IN_USER_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/user`;

export const signUpRequest = async (RequestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), RequestBody)
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};


export const getUserInfo = async (email: string) => {
  const result = await axios
    .get(GET_USER_INFO(email))
    .then((response) => response.data)
    .catch((error) => error);
  return result;
};

export const patchNicknameRequest = async (requestBody: any) => {
  const result = await authFetch()
    .patch(PATCH_NICNAME_URL(), requestBody)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const patchProfileImageRequest = async (requestBody: any) => {
  const result = await authFetch()
    .patch(PATCH_PROFILEIMAGE_URL(), requestBody)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export function useNicknameChange() {
  const { mutate } = useMutation(patchNicknameRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  return mutate;
}

export function useProfileChange() {
  const { mutate } = useMutation(patchProfileImageRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  return mutate;
}
