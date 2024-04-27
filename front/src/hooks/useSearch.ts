import { GetSearchBoardListResponseDto } from "@/pages/api/response/board";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const GET_SEARCH_BOARD_LIST_URL = (
  searchWord: string,
  preSearchWord: string | null
) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/board/search-list/${searchWord}${
    preSearchWord ? "/" + preSearchWord : ""
  }`;

const GET_RELATION_LIST_URL = (searchWord: string) =>
  `${process.env.NEXT_PUBLIC_API_BACK}/search/${searchWord}/relation-list`;

const GET_POPULAR_LIST_URL = () =>
  `${process.env.NEXT_PUBLIC_API_BACK}/search/popular-list`;

/** 검색 단어를 통해 가져온 데이터 */
const getSearchBoardListRequest = async (
  searchWord: string,
  preSearchWord: string | null
) => {
  try {
    const response =await axios
    .get<GetSearchBoardListResponseDto>(
      GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord)
    )
    return response.data;
  } catch (error) {
    throw error
  }
};

/** 검색어 Hook*/
export function useGetSearch(searchWord: string) {
  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);

  const { data = [] } = useQuery(["search", searchWord], () =>
    getSearchBoardListRequest(searchWord, preSearchWord).then((response) => {
      setPreSearchWord(searchWord);
      return response.searchList;
    })
  );
  return data;
}

const getPopularListRequest = async () => {
  return await axios
    .get(GET_POPULAR_LIST_URL())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export function useGetPopularList() {
  const { data = [] } = useQuery<string[]>(["popular-list"], () =>
    getPopularListRequest().then((response) => {
      
      return response.popularWordList;
    })
  );
  return data;
}

/** 연관검색어 가져오기 */
const getRelationListRequest = async (searchWord: string) => {
  return await axios
    .get(GET_RELATION_LIST_URL(searchWord))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
/** 연관검색어 Hook*/
export function useGetRelation(searchWord: string) {
  const { data = [] } = useQuery(["search-relation", searchWord], () =>
    getRelationListRequest(searchWord).then((response) => {
      return response.relativeWordList;
    })
  );
  return data;
}
