import React, { useEffect } from "react";
import style from "./style.module.scss";
interface PagenationProps {
  curPage: number;
  limit: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  onLimitChange: any;
}

export default function Pagination({
  curPage = 1,
  limit = 8,
  totalPage,
  setPage,
  setLimit,
  onLimitChange,
}: PagenationProps) {
  let curFirstPage = (Math.ceil(curPage / limit) - 1) * limit + 1;
  let curLastPage = Math.min(Math.ceil(curPage / limit) * limit, totalPage);
  let curPageList = new Array(curLastPage - curFirstPage + 1)
    .fill(0)
    .map((_: any, i: number) => {
      return curFirstPage + i;
    });

  useEffect(()=>{
    console.log('limit',limit);
    console.log('curPage',curPage);
    console.log('totalPage',totalPage);
  },[limit,curPage, totalPage] )

  return (
    <div className={style["pagination-wrapper"]}>
      <div
        className={`${style["page-item"]} ${style["side-btn"]}`}
        onClick={() => curPage > 1? setPage(curPage - 1):null}
      >
        &laquo;
      </div>
      {curPageList.map((page) => (
        <div
          className={`${style["page-item"]} ${curPage === page ? style["active"] : ""}`}
          key={page}
          onClick={() => setPage(page)}
        >
          {page}
        </div>
      ))}

      <div
        className={`${style["page-item"]} ${style["side-btn"]}`} 
        onClick={() => curPage !== totalPage?setPage(curPage + 1):null}
      >
        &raquo;
      </div>
    </div>
  );
}
