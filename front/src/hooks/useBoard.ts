import { PostBoardRequestDto } from "@/pages/api/request/board";
import authFetch from "@/utils/axios/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { BOARD_DETAIL_PATH } from "@/constants";
import GetBoardResponseDto from "@/stores/get-board.store";
import { ResponseDto } from "@/pages/api/response/index";
import { useEffect, useState } from "react";
import { queryClient } from "@/utils/react-query/queryClient";

const GET_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL = (limit: number, page: number) =>
  `${
    process.env.NEXT_PUBLIC_API_BACK
  }/board/latest-list?limit=${limit}&startNumber=${(page - 1) * limit}`;
const GET_TOP3_LIST_URL = () =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/top-3`;
const DELETE_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const POST_BOARD_URL = () => `${process.env.NEXT_PUBLIC_API_BACK}/board`;
const UPDATE_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const GET_USER_BOARD_LIST = (email: string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/user-board-list/${email}`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: string | number) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}/increase-view-count`;
const FILE_UPLOAD_URL = () => `${process.env.NEXT_PUBLIC_API_FILE}/file/upload`;

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

export const getLatestBoardListRequest = async (
  limit: number,
  page: number
) => {
  try {
    const response = await axios.get(GET_LATEST_BOARD_LIST_URL(limit, page));
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

export const fileUploadRequest = async (data: FormData) => {
  const reuslt = await authFetch(undefined, "multipart/form-data")
    .post(FILE_UPLOAD_URL(), data)
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

type latestListType = {
  limit: number;
  page: number;
};

export function useGetLatestBoard({ limit, page }: latestListType) {
  const [latestBoardList, setLatestBoardList] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { data } = useQuery(["board", "latest", limit, page], () =>
    getLatestBoardListRequest(limit, page)
  );

  useEffect(() => {
    if (data !== undefined) {
      setLatestBoardList(data.latestList);
      setTotalCount(data.totalCount);
    }
  }, [data]);

  return { latestBoardList, totalCount };
}

// export function useGetBoard(boardNumber: number | string) {
//   const { data } = useQuery(["board", boardNumber], () =>
//     getBoardRequest(boardNumber)
//   );
//   return data;
// }

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
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(["board"]);
      router.push(BOARD_DETAIL_PATH(response.boardNumber));
    },
  });
  return mutate;
}

export function useUpdateBoard() {
  const router = useRouter();
  const { mutate } = useMutation(updateBoardRequest, {
    onSuccess: async (response) => {
      await router.push(BOARD_DETAIL_PATH(response.boardNumber));
    },
  });
  return mutate;
}

export function useGetUserBoardList(email: string) {
  const { data } = useQuery(["board"], () =>
    getUserBoardListRequest(email)
  );
  return data?.latestList ? data.latestList : [];
}
