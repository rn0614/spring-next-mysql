import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import Icon from "@/ui/atom/Icon/Icon";
import { getUserBoardListRequest } from "@/hooks/useBoard";
import { BoardListItemType } from "@/types/interface";
import BoardListItem from "@/components/BoardListItem";
import { useRouter } from "next/navigation";
import { BOARD_WRITE_PATH } from "@/constants";
import ProfileImage from "@/ui/atom/ProfileImage/ProfileImage";
import {
  getUserInfo,
  patchNicknameRequest,
  patchProfileImageRequest,
} from "@/hooks/useUser";
import { fileUploadRequest } from "@/hooks/useBoard";
import { useRecoilValue } from "recoil";
import { CurrUserAtom } from "@/stores/login-user.store";

type boardProps = {
  user: any;
  boardList: BoardListItemType[];
};

export default function User({ user, boardList }: boardProps) {
  const UserTop = () => {
    const Loginuser = useRecoilValue(CurrUserAtom);
    const [isMyPage, setMyPage] = useState<boolean>(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [userName, setUserName] = useState<string>(user.nickname);

    const onProfileImageClickHandler = () => {
      if (!isMyPage) return;
      if (!imageInputRef.current) return;
      imageInputRef.current.click();
    };

    const onProfileImageChangeHander = async (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      if (!event?.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      const url = (await fileUploadRequest(data)) as string;

      patchProfileImageRequest({ profileImage: url })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    };

    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    };

    const onNicknameSetHandler = () => {
      patchNicknameRequest({ nickname: userName });
    };

    useEffect(() => {
      if (Loginuser?.email === user.email) {
        setMyPage(true);
      }
    }, [Loginuser]);

    return (
      <div id={style["user-top-wrapper"]}>
        <div className={style["user-top-container"]}>
          {isMyPage ? (
            <div
              className={style["user-top-profile-image-box"]}
              onClick={onProfileImageClickHandler}
            >
              <ProfileImage size="lg" writerProfileImage={user.profileImage} />
            </div>
          ) : (
            <div className={style["user-top-profile-image-box"]}>
              <ProfileImage size="lg" writerProfileImage={user.profileImage} />
            </div>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onProfileImageChangeHander}
          />
          <div className={style["user-top-info-box"]}>
            <div className={style["user-top-info-nickname-box"]}>
              {isMyPage ? (
                <input
                  className={style["user-top-info-nickname-input"]}
                  type="text"
                  value={userName}
                  onChange={onNicknameChangeHandler}
                ></input>
              ) : (
                <div className={style["user-top-info-nickname"]}>
                  {user.nickname}
                </div>
              )}
              {isMyPage && (
                <div
                  className={style["icon-box"]}
                  onClick={onNicknameSetHandler}
                >
                  <Icon icon="edit-icon" />
                </div>
              )}
            </div>
            <div className={style["user-top-info-email"]}>{user.email}</div>
          </div>
        </div>
      </div>
    );
  };

  const UserBottom = () => {
    const router = useRouter();
    const writeBoardHandler = () => {
      router.push(BOARD_WRITE_PATH());
    };

    return (
      <div id={style["user-bottom-wrapper"]}>
        <div className={style["user-bottom-container"]}>
          <div className={style["user-my-board-title"]}>{"내 게시물"}</div>
          <div className={style["user-my-board-contents"]}>
            <div className={style["user-my-board-list"]}>
              {boardList.map((item, idx) => (
                <BoardListItem key={idx} boardListItem={item} />
              ))}
            </div>
            <div
              className={style["write-new-board-box"]}
              onClick={writeBoardHandler}
            >
              <div className={style["new-board-button"]}>{"글쓰기"}</div>
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

// 이 함수는 서버에서 실행되어 페이지의 초기 props를 결정합니다.
export async function getServerSideProps(context: any) {
  try {
    const email = context.query.email as string;
    const boardList = await getUserBoardListRequest(email);
    const user = await getUserInfo(email);
    return {
      props: {
        user: user,
        boardList: boardList.userBoardList,
      },
    };
  } catch (error) {
    console.error("Error fetching board:", error);
    // 에러 발생 시 리다이렉트 처리
    return {
      redirect: {
        destination: "/error", // 오류 페이지 또는 원하는 리다이렉션 대상 URL
        permanent: false, // 이 리다이렉트가 영구적인지 여부 (301 vs 302)
      },
    };
  }
}
