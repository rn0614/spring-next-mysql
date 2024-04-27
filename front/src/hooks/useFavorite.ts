import { FavoriteListItem } from "@/types/interface";
import authFetch from "@/utils/axios/axiosInstance";
import { queryClient } from "@/utils/react-query/queryClient";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

const GET_FAVORITE_LIST_URL = (boardNumber: string | number) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}/favorite-list`;
const PUT_FAVORITE_URL = (boardNumber: string | number) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/${boardNumber}/favorite`;

export const getFavoriteListRequest = async (boardNumber: string | number) => {
  try {
    const response = await authFetch().get(GET_FAVORITE_LIST_URL(boardNumber));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putFavoriteRequest = async (boardNumber: number | string) => {
  try {
    const response = await authFetch().put(PUT_FAVORITE_URL(boardNumber))
    return response.data;
  } catch (error) {
    throw error
  }
};

export function useGetFavoriteList(boardNumber: number | string) {
  const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
  const { data, error } = useQuery(["favorite-list", boardNumber], () =>
    getFavoriteListRequest(boardNumber)
  );
  useEffect(() => {
    if (data !== undefined) {
      setFavoriteList(data.favoriteList);
    }
  }, [data, error]);
  return favoriteList;
}

export function usePutFavorite() {
  const { mutate } = useMutation(putFavoriteRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite-list"]);
    },
  });
  return mutate;
}
