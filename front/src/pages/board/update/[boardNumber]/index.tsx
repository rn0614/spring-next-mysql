import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { IconButton } from "@/ui/atom/Icon/Icon";
import { useRecoilState } from "recoil";
import { Board, CurBoardAtom } from "@/stores/board.store";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import { getBoardRequest } from "@/hooks/useBoard";
import { convertUrlsToFiles } from "@/utils";

export default function BoardUpdate({ boardinit }: any) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [board, setBoard] = useRecoilState(CurBoardAtom);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBoard((pre) => {
      return { ...pre, [e.target.name]: e.target?.value } as Board;
    });
    if (e.target == contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
    if (e.target == titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  };

  const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = [...imageUrls, imageUrl]; // 여기서 혼재돼 버림.
    console.log("newImageUrls", newImageUrls);
    setImageUrls(newImageUrls);
    const newBoardImageFileList = board?.boardImageFileList
      ? [...board?.boardImageFileList!, file]
      : [file];
    setBoard((pre) => {
      return { ...pre, boardImageFileList: newBoardImageFileList } as Board;
    });
    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";
  };

  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };

  const onImageCloseButtonClickHandler = (index: number) => {
    const newImageUrls = imageUrls.filter((_, idx) => idx !== index);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = board?.boardImageFileList.filter(
      (_, idx) => idx !== index
    );
    setBoard((pre) => {
      return { ...pre, boardImageFileList: newBoardImageFileList } as Board;
    });
  };
  useEffect(() => {
    let newBoardImageFileList: File[] = [];
    convertUrlsToFiles(boardinit.boardImageList).then((response) => {
      newBoardImageFileList = response;
    });
    setBoard({ ...boardinit, boardImageFileList: newBoardImageFileList });
    setImageUrls(boardinit.boardImageList);
  }, []);

  return (
    <MainLayout path={"update"}>
      <div id={style["board-update-wrapper"]}>
        <div className={style["board-update-container"]}>
          <div className={style["board-update-box"]}>
            <div className={style["board-wriete-title-box"]}>
              <textarea
                name="title"
                ref={titleRef}
                className={style["board-update-title-textarea"]}
                rows={1}
                placeholder="제목을 작성해주세요."
                value={board ? board.title : ""}
                onChange={onChangeHandler}
              />
            </div>
            <hr />
            <div className={style["board-wriete-content-box"]}>
              <textarea
                name="content"
                ref={contentRef}
                className={style["board-update-content-textarea"]}
                placeholder="본문을 작성해주세요."
                value={board ? board.content : ""}
                onChange={onChangeHandler}
              />
              <IconButton
                icon="image-box-light-icon"
                onButtonClick={onImageUploadButtonClickHandler}
              ></IconButton>
              <input
                name="image"
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onImageChangeHandler}
              />
            </div>
            <div className={style["board-update-images-box"]}>
              {imageUrls.map((item, idx) => (
                <div key={idx} className={style["board-update-image-box"]}>
                  <img className={style["board-update-image"]} src={item} />
                  <IconButton
                    icon="image-close-icon"
                    onButtonClick={() => onImageCloseButtonClickHandler(idx)}
                    position="top"
                  ></IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// 이 함수는 서버에서 실행되어 페이지의 초기 props를 결정합니다.
export async function getServerSideProps(context: any) {
  const boardNumber = context.query.boardNumber as string;
  const board = await getBoardRequest(boardNumber);
  
  const boardInit = {
    boardNumber: board.boardNumber,
    title: board.title,
    content: board.content,
    boardImageList: board.boardImageList,
  };
  return {
    props: {
      boardinit: boardInit,
    },
  };
}
