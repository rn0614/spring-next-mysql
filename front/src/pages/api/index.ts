import axios, { AxiosHeaderValue } from "axios";
import { ResponseDto } from "./response";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { GetSignInUserResponseDto } from "./response/user";
import { PostBoardRequestDto, PostCommentRequestDto } from "./request/board";
import {
  DeleteBoardResponseDto,
  GetCommentListResponseDto,
  GetFavoriteListResponseDto,
  PostBoardResponseDto,
  PostCommentResponseDto,
  PutFavoriteResponseDto,
} from "./response/board";
import GetBoardResponseDto from "@/stores/get-board.store";
import authFetch from "@/utils/axios/axiosInstance";

const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api/v1`;
const FILE_DOMAIN = `${DOMAIN}/file`;
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const GET_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/comment`;

const INCREASE_VIEW_COUNT_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/increas-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const PUT_FAVORITE_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite`;

const GET_SING_IN_USER_URL = () => `${API_DOMAIN}/user`;

const DELETE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;

export const putFavoriteRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .put(PUT_FAVORITE_URL(boardNumber), {}, bearAuthorization(accessToken))
    .then((response) => {
      const responseBody: PutFavoriteResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const bearAuthorization = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getBoardRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_BOARD_URL(boardNumber))
    .then((response) => {
      const requestBody: GetBoardResponseDto = response.data;
      return requestBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getFavoriteListRequest = async (boardNumber: string | number) => {
  const result = axios
    .get(GET_FAVORITE_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: GetFavoriteListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postBoardRequest = async (
  requestBody: PostBoardRequestDto,
  accessToken: string
) => {
  const result = await authFetch()
    .post(POST_BOARD_URL(), requestBody, bearAuthorization(accessToken))
    .then((response) => {
      const responseBody: PostBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postCommentRequest = async (
  boardNumber: number | string,
  requestBody: PostCommentRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(
      POST_COMMENT_URL(boardNumber),
      requestBody,
      bearAuthorization(accessToken)
    )
    .then((response) => {
      const responseBody: PostCommentResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

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
  console.log("signUp front start", RequestBody);
  const result = await axios
    .post(SIGN_UP_URL(), RequestBody)
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
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

export const deleteBoardRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .delete(DELETE_BOARD_URL(boardNumber), bearAuthorization(accessToken))
    .then((response) => {
      const responseBody: DeleteBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
