import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import React, { useEffect } from "react";
import SearchButton from "@/ui/morecular/SearchButton/SearchButton";
import Button from "@/ui/atom/Button/Button";
import Icon from "@/ui/atom/Icon/Icon";
import { AUTH_PATH, MAIN_PATH, USER_PATH } from "@/constants";
import { useRecoilState } from "recoil";
import { CurrUserAtom } from "@/stores/login-user.store";
import { useCookies } from "react-cookie";
import { CurBoardAtom } from "@/stores/board.store";
import { fileUploadRequest, postBoardRequest } from "@/pages/api";
import { PostBoardRequestDto } from "@/pages/api/request/board";
import { PostBoardResponseDto } from "@/pages/api/response/board";
import { ResponseDto } from "@/pages/api/response";

type Props ={
  path:string
}
let loginButtonOn= false;
export default function Header({path}:Props) {
  const [loginUser, setLoginUser] = useRecoilState(CurrUserAtom);
  const [cookies, setCookies] = useCookies();
  const [board, setBorad] = useRecoilState(CurBoardAtom);
  

  const router = useRouter();

  const postBoardResponse = (
    responseBody: PostBoardResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "AF" || code === "NU") router.push(AUTH_PATH());
    if (code === "VF") alert("제목과 내용은 필수입니다.");
    if (code === "DBE") alert("데이터 베이스 오류입니다.");
    if (code !== "SU") return;
    setBorad(null);
    if (!loginUser) return;
    router.push(MAIN_PATH());
  };

  const onUploadButtonClickHandler = async () => {
    const accessToken = cookies.accessToken;
    if (!accessToken || !board) return;

    const boardImageList: string[] = [];
    if (board?.boardImageFileList) {
      for (const file of board?.boardImageFileList) {
        const data = new FormData();
        data.append("file", file);

        const url = await fileUploadRequest(data) as string;
        if (url) boardImageList.push(url);
      }
    }

    const requestBody: PostBoardRequestDto = {
      title: board.title,
      content: board.content,
      boardImageList,
    };
    postBoardRequest(requestBody, accessToken).then(postBoardResponse);
  };

  const onLogoClickHander = () => {
    router.push("/");
  };

  const onMyPageButtonClickHandler = () => {
    if (!loginUser) return;
    const { nickname } = loginUser;
    router.push(USER_PATH(nickname));
  };

  const onSignInButtonClickHandler = () => {
    router.push("/auth");
  };

  const onLogOutButtonClickHandler = () => {
    setCookies("accessToken", null); // expires: expires,
    setLoginUser(null);
    router.push("/");
  };
  useEffect(()=>{
    if(!loginUser){
      loginButtonOn=true;
    }
  },[loginUser])

  return (
    <header id={styles["header"]} className="header">
      <div className={styles["header-container"]}>
        <div className={styles["header-left-box"]} onClick={onLogoClickHander}>
          <Icon icon="logo-dark-icon" heading={true} />
          <div className={styles["header-log"]}>{"Koo"}</div>
        </div>
        <div className={styles["header-right-box"]}>
          <SearchButton />
          {loginUser && path==="home"&&(
            <>
              <Button color="white" onClick={onMyPageButtonClickHandler}>
                마이페이지
              </Button>
              <Button onClick={onLogOutButtonClickHandler}>로그아웃</Button>
            </>
          )}
          {loginUser && path==="write" && (
            <Button onClick={onUploadButtonClickHandler}>업로드</Button>
          )}
          {!loginUser&& loginButtonOn && (
            <Button onClick={onSignInButtonClickHandler}>로그인</Button>
          )}
        </div>
      </div>
    </header>
  );
}
