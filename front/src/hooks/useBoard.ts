import { PostBoardRequestDto } from "@/pages/api/request/board";
import authFetch from "@/utils/axios/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { BOARD_DETAIL_PATH } from "@/constants";

const GET_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const DELETE_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const POST_BOARD_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/board`;
const UPDATE_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;

export const getBoardRequest = async (boardNumber: number | string) => {
  return await axios
    .get(GET_BOARD_URL(boardNumber))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteBoardRequest = async (boardNumber: number | string) => {
  return await authFetch()
    .delete(DELETE_BOARD_URL(boardNumber))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const postBoardRequest = async (requestBody: PostBoardRequestDto) => {
  const result = await authFetch()
    .post(POST_BOARD_URL(), requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      return error.response.data;
    });
  return result;
};

const updateBoardRequest = async ({ boardNumber, requestBody }: any) => {
  const result = await authFetch()
    .patch(UPDATE_BOARD_URL(boardNumber), requestBody)
    .then((response) => {
      console.log("response1", response);
      return response.data;
    })
    .catch((error) => {
      console.log("error1", error);
      if (!error.response.data) return null;
      return error.response.data;
    });
  return result;
};

export function useGetBoard(boardNumber: number | string) {
  const { data } = useQuery(["board", boardNumber], async () =>
    getBoardRequest(boardNumber)
  );
  return data;
}

export function useDeleteBoard() {
  const { mutate } = useMutation(deleteBoardRequest, {
    onSuccess: () => {
      console.log("요청성공");
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
