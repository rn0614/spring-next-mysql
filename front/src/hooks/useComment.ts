import { CommentListItem } from "@/types/interface";
import authFetch from "@/utils/axios/axiosInstance";
import { queryClient } from "@/utils/react-query/queryClient";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

const GET_COMMENT_LIST_URL = ({ boardNumber, limit, page }: getCommentType) =>
  `/board/${boardNumber}/comment-list?limit=${limit}&startNumber=${(page-1)*limit}`;
const POST_COMMENT_URL = (boardNumber: number | string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}/comment`;

const getCommentListRequest = async ({
  boardNumber,
  limit,
  page,
}: getCommentType) => {
  try {
    const response = await authFetch()
    .get(GET_COMMENT_LIST_URL({ boardNumber, limit, page }))
    return response.data
  } catch (error) {
    throw error
  }
};

const postCommentRequest = async ({ boardNumber, requestBody }: any) => {
  try {
    const response = await authFetch().post(POST_COMMENT_URL(boardNumber), requestBody);
    return response
  } catch (error) {
    throw error;
  }
};

type getCommentType = {
  boardNumber: number | string;
  limit: number;
  page: number;
};

export function useGetCommentList({
  boardNumber,
  limit,
  page,
}: getCommentType) {
  const [commentList, setCommentList] = useState<CommentListItem[]>([]);
  const { data, error } = useQuery(
    ["comment-list", boardNumber, limit, page],
    () => getCommentListRequest({ boardNumber, limit, page })
  );
  useEffect(() => {
    if (data !== undefined) {
      setCommentList(data.commentList);
    }
  }, [data, error]);
  return commentList;
}

export function usePostComment() {
  const { mutate } = useMutation(postCommentRequest, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["comment-list"]);
      alert("댓글이 등록됐습니다.");
    },
  });
  return mutate;
}
