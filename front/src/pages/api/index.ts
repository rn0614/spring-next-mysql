import axios, { AxiosHeaderValue } from "axios";
import { ResponseDto } from "./response";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { GetSignInUserResponseDto } from "./response/user";

const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api/v1`;
const FILE_DOMAIN = `${DOMAIN}/file`;
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

const INCREASE_VIEW_COUNT_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/increas-view-count`;

const GET_SING_IN_USER_URL = () => `${API_DOMAIN}/user`;

const bearAuthorization = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

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

// user 가 실제로 인가된 유저인지 확인하는 router
export const getSignInUserRequest = async (accessToken: string) => {
  const result = await fetch(
    GET_SING_IN_USER_URL(),
    bearAuthorization(accessToken)
  )
    .then((response) => response.json())
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response?.data;
      return responseBody;
    });
  return result;
};

export const fileUploadRequest = async (data: FormData) => {
  const reuslt = await axios
    .post(FILE_UPLOAD_URL(), data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      const responseBody: string = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return reuslt;
};

export const increaseViewCountRequest = async (
  boardNumber: number | string
) => {
  const result = await axios
    .get(INCREASE_VIEW_COUNT_URL(boardNumber))
    .then((response) => {
      const responseBody: string = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
