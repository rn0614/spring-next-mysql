import React from "react";
import styles from "./style.module.scss";
import { BoardListItemType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { Profile } from "@/ui/atom/ProfileImage/ProfileImage";
import { BOARD_DETAIL_PATH } from "@/constants";
import Text from "@/ui/atom/Text/Text";

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
    console.log("boardNumber", boardNumber);
    router.push(BOARD_DETAIL_PATH(boardNumber));
  };

  return (
    <div
      className={styles["top-3-list-item"]}
      style={{
        backgroundImage: `${
          boardTitleImage ? "url(" + boardTitleImage + ")" : null
        }`,
      }}
      onClick={onClickHandler}
    >
      <div className={styles["top-3-list-item-main-box"]}>
        <Profile
          writerProfileImage={writerProfileImage}
          writerNickname={writerNickname}
          writerDatetime={writerDatetime}
          color="white"
        >
          <div style={{ display: "flex", alignItems:"center", gap:"10px" }}>
            <Profile.Image />
            <Profile.NickName />
          </div>
        </Profile>
        <Text size="lg">{title}</Text>
        <Text>{content}</Text>
        <Text size="sm">
          {`하트:${favoriteCount} 댓글:${commentCount} 조회수:${viewCount}`}
        </Text>
      </div>
    </div>
  );
}
