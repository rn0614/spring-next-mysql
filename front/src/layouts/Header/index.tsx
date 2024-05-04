import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import React from "react";
import SearchButton from "@/ui/morecular/SearchButton/SearchButton";
import Button from "@/ui/atom/Button/Button";
import Icon from "@/ui/atom/Icon/Icon";
import { BOARD_DETAIL_PATH, MAIN_PATH, USER_PATH } from "@/constants";
import { useRecoilState } from "recoil";
import { CurBoardAtom } from "@/stores/board.store";
import { fileUploadRequest } from "@/hooks/useBoard";
import { PostBoardRequestDto } from "@/pages/api/request/board";
import { usePostBoard, useUpdateBoard } from "@/hooks/useBoard";
import { queryClient } from "@/utils/react-query/queryClient";
import { useGetLoginUser } from "@/hooks/useLogin";
import { useCookies } from "react-cookie";

type Props = {
  path: string;
};

export default function Header({ path }: Props) {
  const {loginUser,resetUser} = useGetLoginUser();
  const [board, setBorad] = useRecoilState(CurBoardAtom);
  const [cookies, setCookies] = useCookies();
  const accessToken = cookies.accessToken;

  const postBoard = usePostBoard();
  const updateBoard = useUpdateBoard();

  const router = useRouter();

  const onUploadButtonClickHandler = async () => {
    if (!accessToken || !board) return;

    const boardImageList: string[] = [];
    if (board?.boardImageFileList) {
      for (const file of board?.boardImageFileList) {
        const data = new FormData();
        data.append("file", file);

        const url = (await fileUploadRequest(data)) as string;
        if (url) boardImageList.push(url);
      }
    }

    const requestBody: PostBoardRequestDto = {
      title: board.title,
      content: board.content,
      boardImageList,
    };
    postBoard(requestBody);
    setBorad(null);
    
  };

  const onUpdateButtonClickHandler = async () => {
    if (!accessToken || !board) return;
    const boardNumber = board.boardNumber;

    const boardImageList: string[] = [...board.boardImageList!];
    if (board?.boardImageFileList) {
      for (const file of board?.boardImageFileList) {
        const data = new FormData();
        data.append("file", file);

        const url = (await fileUploadRequest(data)) as string;
        if (url) boardImageList.push(url);
      }
    }

    const requestBody = {
      title: board.title,
      content: board.content,
      boardImageList,
    };
    updateBoard({ boardNumber, requestBody });
    setBorad(null);
    router.push(BOARD_DETAIL_PATH(boardNumber!));
  };

  const onLogoClickHander = () => {
    router.push("/");
  };

  const onMyPageButtonClickHandler = () => {
    if (!loginUser) return;
    const { email } = loginUser;
    router.push(USER_PATH(email));
  };

  const onSignInButtonClickHandler = () => {
    router.push("/auth");
  };

  const onLogOutButtonClickHandler = () => {
    resetUser();
    router.push("/");
  };

  return (
    <header id={styles["header"]} className="header">
      <div className={styles["header-container"]}>
        <div className={styles["header-left-box"]} onClick={onLogoClickHander}>
          <Icon icon="logo-dark-icon" heading={true} />
          <div className={styles["header-log"]}>{"Koo"}</div>
        </div>
        <div className={styles["header-right-box"]}>
          <SearchButton />
          {loginUser && path === "home" && (
            <>
              <Button color="white" onClick={onMyPageButtonClickHandler}>
                마이페이지
              </Button>
              <Button onClick={onLogOutButtonClickHandler}>로그아웃</Button>
            </>
          )}
          {loginUser && path === "write" && (
            <Button onClick={onUploadButtonClickHandler}>업로드</Button>
          )}
          {loginUser && path === "update" && (
            <Button onClick={onUpdateButtonClickHandler}>수정하기</Button>
          )}
          {!loginUser && (
            <Button onClick={onSignInButtonClickHandler}>로그인</Button>
          )}
        </div>
      </div>
    </header>
  );
}
