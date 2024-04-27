import React, {  useState } from "react";
import style from "./style.module.scss";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import { useRouter } from "next/navigation";
import BoardListItem from "@/components/BoardListItem";
import { SEARCH_PATH } from "@/constants";
import Pagination from "@/components/Pagination";
import {useGetSearch, useGetRelation} from "@/hooks/useSearch";

type Props ={
  searchWord:string
}

export default function Search({searchWord}:Props) {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const searchList = useGetSearch(searchWord);
  const relationList = useGetRelation(searchWord);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const onRelationWordClickHandler = (word: string) => {
    router.push(SEARCH_PATH(word));
  };

  return (
    <MainLayout path="home">
      <div id={style["search-wrapper"]}>
        <div className={style["search-container"]}>
          <div className={style["search-title-box"]}>
            <div className={style["search-title"]}>
              <span className={style["search-title-emphasis"]}>
                {"search-title"}
              </span>
            </div>
            <div className={style["search-count"]}>{searchList.length}</div>
          </div>
          <div className={style["search-contents-box"]}>
            {searchList.length === 0 ? (
              <div className={style["search-contents-nothing"]}>
                {"검색 결과가 없습니다."}
              </div>
            ) : (
              <div className={style["search-contents"]}>
                {searchList.map((boardListItem) => (
                  <BoardListItem
                    key={boardListItem.boardNumber}
                    boardListItem={boardListItem}
                  ></BoardListItem>
                ))}
              </div>
            )}
            <div className={style["search-relation-box"]}>
              <div className={style["search-relation-card-container"]}>
                <div className={style["search-relation-card-title"]}>
                  {"관련검색어"}
                </div>
                <div className={style["search-relation-card-contents"]}>
                  {relationList.length === 0 ? (
                    <div
                      className={style["search-relation-card-contents-nothing"]}
                    >
                      {"관련검색어가 없습니다."}
                    </div>
                  ) : (
                    relationList.map((word:string) => (
                      <div
                        key={word}
                        className={style["word-badge"]}
                        onClick={() => onRelationWordClickHandler(word)}
                      >
                        {word}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {count !== 0 && (
            <div className={style["search-pagination-box"]}>
              <Pagination
                curPage={page}
                limit={limit}
                totalPage={
                  relationList[0]
                    ? Math.ceil((+relationList[0].length + 1) / limit)
                    : 1
                }
                setPage={setPage}
                setLimit={setLimit}
                onLimitChange={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}


// 이 함수는 서버에서 실행되어 페이지의 초기 props를 결정합니다.
export async function getServerSideProps(context: any) {
  const searchWord = context.query.searchWord[0] as string;
  return {
    props: {
      searchWord: searchWord,
    },
  };
}