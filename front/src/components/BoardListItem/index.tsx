import React from "react";
import styles from "./style.module.scss";
import { BoardListItemType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { ProfileImageWithNickName } from "@/ui/atom/ProfileImage/ProfileImage";

type Props = {
  boardListItem: BoardListItemType;
};

export default function BoardListItem({ boardListItem }: Props) {
  const router = useRouter();
  const {
    boardNumber,
    writerProfileImage,
    writerNickname,
    writerDatetime,
    title,
    content,
    favoriteCount,
    commentCounter,
    viewCount,
    boardTitleImage,
  } = boardListItem;

  const onClickHandler = () => {
    router.push(`/board/detail/${boardNumber}`);
  };

  return (
    <div className={styles["board-list-item"]} onClick={onClickHandler}>
      <div className={styles["board-list-item-main-box"]}>
        <div className={styles["board-list-item-top"]}>
          <ProfileImageWithNickName
            writerProfileImage={writerProfileImage}
            writerNickname={writerNickname}
            writerDatetime={writerDatetime}
          />
        </div>
        <div className={styles["board-list-item-middle"]}>
          <div className={styles["board-list-item-title"]}>{title}</div>
          <div className={styles["board-list-item-content"]}>{content}</div>
        </div>
        <div className={styles["board-list-item-bottom"]}>
          <div className={styles["board-list-item-counts"]}>
            {`하트:${favoriteCount} 댓글:${commentCounter} 조회수:${viewCount}`}
          </div>
        </div>
      </div>
      {boardTitleImage && (
        <div className={styles["board-list-item-image-box"]}>
          <div
            className={styles["board-list-item-image"]}
            style={{ backgroundImage: `url(${boardTitleImage})` }}
          ></div>
        </div>
      )}
    </div>
  );
}
