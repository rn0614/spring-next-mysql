import React, { ChangeEvent, useEffect, useRef } from "react";
import style from "./style.module.scss";
import { IconButton } from "@/ui/atom/Icon/Icon";
import { useRecoilState } from "recoil";
import { Board, CurBoardAtom } from "@/stores/board.store";

export default function BoardWrite() {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [board, setBoard] = useRecoilState(CurBoardAtom);
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setBoard((pre) => {
      return { ...pre, [e.target.name]: e.target?.value } as Board;
    });
  };

  return (
    <div id={style["board-write-wrapper"]}>
      <div className={style["board-write-container"]}>
        <div className={style["board-write-box"]}>
          <div className={style["board-wriete-title-box"]}>
            <input
              name="title"
              className={style["board-write-title-input"]}
              type="text"
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
              onButtonClick={() => {}}
            ></IconButton>
            <input
              name="image"
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onChangeHandler}
            />
          </div>
          <div className={style["board-write-images-box"]}>
            <div className={style["board-write-image-box"]}>
              <img className={style["board-write-image"]} src={'http://localhost:4000/file/766a71bb-7ea1-4aba-af2a-d705aa1b4569.png'} />
              <IconButton
                icon="image-close-icon"
                onButtonClick={() => {}}
                position="top"
              ></IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
