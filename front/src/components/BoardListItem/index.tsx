import React from "react";
import styles from "./style.module.scss";
import { BoardListItemType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { ProfileImageWithNickName } from "@/ui/atom/ProfileImage/ProfileImage";
import { BOARD_DETAIL_PATH } from "@/constants";
import Text from "@/ui/atom/Text/Text";

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
    commentCount,
    viewCount,
    boardTitleImage,
  } = boardListItem;

  const onClickHandler = () => {
    router.push(BOARD_DETAIL_PATH(boardNumber));
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
          <Text size="md">{title}</Text>
          <Text size="sm">{content}</Text>
        </div>
        <Text size="sm">
          {`하트:${favoriteCount} 댓글:${commentCount} 조회수:${viewCount}`}
        </Text>
      </div>
      {boardTitleImage && (
        <div
          className={styles["board-list-item__image-box"]}
          style={{ backgroundImage: `url(${boardTitleImage})`,backgroundSize: "cover" }}
        ></div>
      )}
    </div>
  );
}
