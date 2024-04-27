import { PostBoardRequestDto } from "@/pages/api/request/board";
import authFetch from "@/utils/axios/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { BOARD_DETAIL_PATH } from "@/constants";
import GetBoardResponseDto from "@/stores/get-board.store";

const GET_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL = () =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/latest-list`;
const GET_TOP3_LIST_URL = () =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/top-3`;
const DELETE_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const POST_BOARD_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/board`;
const UPDATE_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const GET_USER_BOARD_LIST = (email: string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/user-board-list/${email}`;

export const getBoardRequest = async (boardNumber: number | string) => {
  try {
    const response = await axios.get<GetBoardResponseDto>(
      GET_BOARD_URL(boardNumber)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLatestBoardListRequest = async () => {
  try {
    const response = await axios.get(GET_LATEST_BOARD_LIST_URL());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTop3BoardListRequest = async () => {
  try {
    const response = await axios.get(GET_TOP3_LIST_URL());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBoardListRequest = async (email: string) => {
  try {
    const response = await axios.get(GET_USER_BOARD_LIST(email));
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteBoardRequest = async (boardNumber: number | string) => {
  try {
    const response = await authFetch().delete(DELETE_BOARD_URL(boardNumber));
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postBoardRequest = async (requestBody: PostBoardRequestDto) => {
  try {
    const response = await authFetch().post(POST_BOARD_URL(), requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateBoardRequest = async ({ boardNumber, requestBody }: any) => {
  try {
    const response = await authFetch().patch(
      UPDATE_BOARD_URL(boardNumber),
      requestBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export function useGetLatestBoard() {
  const { data } = useQuery(["board", "latest"], getLatestBoardListRequest);
  return data?.latestList ? data.latestList : [];
}

export function useGetBoard(boardNumber: number | string) {
  const { data } = useQuery(["board", boardNumber], () =>
    getBoardRequest(boardNumber)
  );
  return data;
}

export function useDeleteBoard() {
  const { mutate } = useMutation(deleteBoardRequest, {
    onSuccess: () => {
      console.log("삭제 요청성공");
    },
  });
  return mutate;
}

export function usePostBoard() {
  const router = useRouter();
  const { mutate } = useMutation(postBoardRequest, {
    onSuccess: (response) => {
      router.push(BOARD_DETAIL_PATH(response.boardNumber));
    },
  });
  return mutate;
}

export function useUpdateBoard() {
  const router = useRouter();
  const { mutate } = useMutation(updateBoardRequest, {
    onSuccess: (response) => {
      router.push(BOARD_DETAIL_PATH(response.boardNumber));
    },
  });
  return mutate;
}

export function useGetUserBoardList(email: string) {
  const { data } = useQuery(["user-board-list"], () =>
    getUserBoardListRequest(email)
  );
  return data?.latestList ? data.latestList : [];
}
