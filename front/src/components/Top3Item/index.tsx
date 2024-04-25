import React from "react";
import styles from "./style.module.scss";
import { BoardListItemType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { ProfileImageWithNickName } from "@/ui/atom/ProfileImage/ProfileImage";
import { BOARD_DETAIL_PATH } from "@/constants";

type Props = {
  top3ListItem: BoardListItemType;
};

export default function Top3Item({ top3ListItem }: Props) {
  const {
    boardNumber,
    title,
    content,
    boardTitleImage,
    favoriteCount,
    commentCount,
    viewCount,
    writerDatetime,
    writerNickname,
    writerProfileImage,
  } = top3ListItem;

  const router = useRouter();

  const onClickHandler = () => {
    router.push(BOARD_DETAIL_PATH(boardNumber));
  };

  return (
    <div
      className={styles["top-3-list-item"]}
      style={{ backgroundImage: `${boardTitleImage?"url("+boardTitleImage+")":null}` }}
      onClick={onClickHandler}
    >
      <div className={styles["top-3-list-item-main-box"]}>
        <div className={styles["top-3-list-item-top"]}>
          <ProfileImageWithNickName
            writerProfileImage={writerProfileImage}
            writerNickname={writerNickname}
            writerDatetime={writerDatetime}
            color="white"
          />
        </div>
        <div className={styles["top-3-list-item-middle"]}>
          <div className={styles["top-3-list-item-title"]}>{title}</div>
          <div className={styles["top-3-list-item-content"]}>{content}</div>
        </div>
        <div className={styles["top-3-list-item-bottom"]}>
          <div className={styles["top-3-list-item-counts"]}>
            {`하트:${favoriteCount} 댓글:${commentCount} 조회수:${viewCount}`}
          </div>
        </div>
      </div>
    </div>
  );
}
