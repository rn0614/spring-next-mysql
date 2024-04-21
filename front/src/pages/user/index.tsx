import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import React, { useState } from "react";
import style from "./style.module.scss";
import Icon from "@/ui/atom/Icon/Icon";

export default function User() {
  const UserTop = () => {
    const [isMyPage, setMyPage] = useState<boolean>(true);

    return (
      <div id={style["user-top-wrapper"]}>
        <div className={style["user-top-container"]}>
          {isMyPage ? (
            <div className={style["user-top-my-profile-image-box"]}></div>
          ) : (
            <div className={style["user-top-profile-image-box"]}></div>
          )}
          <div className={style["user-top-info-box"]}>
            <div className={style["user-top-info-nickname-box"]}>
              <div className={style["user-top-info-nickname"]}>{"닉네임"}</div>
              {isMyPage && (
                <div className={style["icon-box"]}>
                  <Icon icon="edit-icon" onClick={() => {}} />
                </div>
              )}
            </div>
            <div className={style["user-top-info-email"]}>
              {"이메일@naver.com"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UserBottom = () => {
    return (
      <div id={style["user-bottom-wrapper"]}>
        <div className={style["user-bottom-container"]}>
          <div className={style["user-my-board-title"]}>{"내 게시물"}</div>
          <div className={style["user-my-board-contents"]}>
            <div className={style["user-my-board-list"]}></div>
            <div className={style["write-new-board-box"]}>
              <div className={style["new-board-button"]}>{"button"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout path="user">
      <div id={style["main-area"]}>
        <UserTop />
        <UserBottom />
      </div>
    </MainLayout>
  );
}
