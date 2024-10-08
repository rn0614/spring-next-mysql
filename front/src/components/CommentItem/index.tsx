import React from "react";
import styles from "./style.module.scss";
import {Profile} from "@/ui/atom/ProfileImage/ProfileImage";
import { CommentListItem } from "@/types/interface";
import { getElapsedTime } from "@/utils/day";

type CommentItemProsp = {
  commentItem: CommentListItem;
};

export default function CommentItem({ commentItem }: CommentItemProsp) {
  const { nickname, profileImage, writeDatetime, content } = commentItem;
  return (
    <div className={styles["comment-list-item"]}>
      <div className={styles["comment-list-item-top"]}>
        <Profile writerProfileImage={profileImage} >
          <Profile.Image/>
        </Profile>
        <div className={styles["comment-list-item-nickname"]}>{nickname}</div>
        <div className={styles["comment-list-item-divider"]}>{`\|`}</div>
        <div className={styles["comment-list-item-time"]}>{getElapsedTime(writeDatetime)}</div>
      </div>
      <div className={styles["comment-list-item-main"]}>
        <div className={styles["comment-list-item-content"]}>{content}</div>
      </div>
    </div>
  );
}
