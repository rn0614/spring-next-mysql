import axios, { AxiosHeaderValue } from "axios";
import { ResponseDto } from "./response";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { GetSignInUserResponseDto } from "./response/user";

const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api/v1`;

const bearAuthorization = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      const responseBody: SignInRequestDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const signUpRequest = async (RequestBody: SignUpRequestDto) => {
  console.log("signUp front start", RequestBody);
  const result = await axios
    .post(SIGN_UP_URL(), RequestBody)
    .then((response) => {
      const responseBody: SignUpRequestDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      console.log(error);
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const GET_SING_IN_USER_URL = () => `${API_DOMAIN}/user`;

// user 가 실제로 인가된 유저인지 확인하는 router
export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios.get(
    GET_SING_IN_USER_URL(),
    bearAuthorization(accessToken)
  ).then(response=>{
    const responseBody:GetSignInUserResponseDto = response.data;
    return responseBody;
  }).catch(error => {
    if(!error.response) return null;
    const responseBody:ResponseDto = error.response.data;
    return responseBody
  })
  return result;
  ;
};
