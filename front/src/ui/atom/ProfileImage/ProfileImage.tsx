import React from "react";
import styles from "./ProfileIamge.module.scss";

type ProfileProps = {
  writerProfileImage: string | null;
};

export default function ProfileImage({ writerProfileImage }: ProfileProps) {
  return (
    <div className={styles["profile-box"]}>
      <div
        className={styles["profile-image"]}
        style={{
          backgroundImage: `url(${
            writerProfileImage
              ? writerProfileImage
              : "/image/default-profile-image.png"
          })`,
        }}
      ></div>
    </div>
  );
}

type WithNickName = {
  writerNickname: string;
  writerDatetime: string;
  color?: 'white'|'black';
} & ProfileProps;

export function ProfileImageWithNickName({
  writerProfileImage,
  writerNickname,
  writerDatetime,
  color="black",
  
}: WithNickName) {
  return (
    <>
      <ProfileImage writerProfileImage={writerProfileImage} />
      <div className={`${styles["board-list-item-write-box"]} ${styles[color]}`}>
        <div className={styles["board-list-item-nickname"]}>
          {writerNickname}
        </div>
        <div className={styles["board-list-item-write-datetime"]} suppressHydrationWarning>
          {writerDatetime}
        </div>
      </div>
    </>
  );
}
