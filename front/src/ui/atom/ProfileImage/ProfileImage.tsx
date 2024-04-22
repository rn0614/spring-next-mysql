import React from "react";
import style from "./ProfileIamge.module.scss";

type ProfileProps = {
  writerProfileImage: string | null;
  size?:"lg"|"md"|"sm"
};

export default function ProfileImage({ writerProfileImage, size="sm" }: ProfileProps) {
  return (
    <div className={`${style["profile-box"]} ${style["size-"+size]}`}>
      <div
        className={style["profile-image"]}
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
      <div className={`${style["board-list-item-write-box"]} ${style[color]}`}>
        <div className={style["board-list-item-nickname"]}>
          {writerNickname}
        </div>
        <div className={style["board-list-item-write-datetime"]} suppressHydrationWarning>
          {writerDatetime}
        </div>
      </div>
    </>
  );
}
