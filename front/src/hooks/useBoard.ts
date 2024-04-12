import { CommentListItem } from "@/types/interface";
import authFetch from "@/utils/axios/axiosInstance";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const GET_BOARD_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}`;
const GET_COMMENT_LIST_URL = (boardNumber: string | number) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}/comment-list`;

export const getBoardRequest = async (boardNumber: number | string) => {
  const data = await authFetch().get(GET_BOARD_URL(boardNumber));
  return data;
};

export function useBoard(boardNumber: number | string) {
  const { data } = useQuery(["board", boardNumber], async () =>
    getBoardRequest(boardNumber)
  );
  return data;
}

export const getCommentListRequest = async (boardNumber: number | string) => {
  const { data } = await authFetch().get(GET_COMMENT_LIST_URL(boardNumber));
  return data;
};

export function useComment(boardNumber: number | string) {
  const [commentList, setCommentList] = useState<CommentListItem[]>([]);
  const { data } = useQuery<CommentListItem[]>(
    ["comment-list", boardNumber],
    async () => getCommentListRequest(boardNumber)
  );
  useEffect(() => {
    if(data!==undefined) setCommentList(data);
  }, [data]);
  return { commentList };
}
