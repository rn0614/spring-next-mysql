import React from "react";
import styles from "./style.module.scss";
import ProfileImage from "@/ui/atom/ProfileImage/ProfileImage";
import { favoriteListItem } from "@/types/interface";

type FavoriteItemProps = {
  favoriteListItem: favoriteListItem;
};

export default function FavoriteItem({ favoriteListItem }: FavoriteItemProps) {
  const { email, nickname, profileImage } = favoriteListItem;
  return (
    <div className={styles["favorite-list-item"]}>
      <ProfileImage writerProfileImage={profileImage} />
      <div className={styles["favorite-list-item-nickname"]}>{nickname}</div>
    </div>
  );
}
