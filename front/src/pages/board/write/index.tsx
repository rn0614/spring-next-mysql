import React, { ChangeEvent, useRef, useState } from "react";
import style from "./style.module.scss";
import { IconButton } from "@/ui/atom/Icon/Icon";
import { useRecoilState } from "recoil";
import { Board, CurBoardAtom } from "@/stores/board.store";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";

export default function BoardWrite() {
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
    const newImageUrls = [...imageUrls, imageUrl];
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

  return (
    <MainLayout path={"write"}>
      <div id={style["board-write-wrapper"]}>
        <div className={style["board-write-container"]}>
          <div className={style["board-write-box"]}>
            <div className={style["board-wriete-title-box"]}>
              <textarea
                name="title"
                ref={titleRef}
                className={style["board-write-title-textarea"]}
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
                className={style["board-write-content-textarea"]}
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
            <div className={style["board-write-images-box"]}>
              {imageUrls.map((item, idx) => (
                <div key={idx} className={style["board-write-image-box"]}>
                  <img className={style["board-write-image"]} src={item} />
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
