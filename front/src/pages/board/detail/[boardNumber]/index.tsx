import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./style.module.scss";
import Icon, { IconButton } from "@/ui/atom/Icon/Icon";
import FavoriteItem from "@/components/FavoriteItem";
import { Board, FavoriteListItem } from "@/types/interface";
import CommentItem from "@/components/CommentItem";
import Button from "@/ui/atom/Button/Button";
import Pagination from "@/components/Pagination";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import { ProfileImageWithNickName } from "@/ui/atom/ProfileImage/ProfileImage";
import { useRecoilValue } from "recoil";
import { CurrUserAtom } from "@/stores/login-user.store";
import { useRouter } from "next/router";
import {
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  USER_PATH,
} from "@/constants";
import {
  deleteBoardRequest,
  getBoardRequest,
  getFavoriteListRequest,
  increaseViewCountRequest,
  postCommentRequest,
  putFavoriteRequest,
} from "@/pages/api";
import { useComment } from "@/hooks/useBoard";
import { getElapsedTime } from "@/utils/day";
import {
  DeleteBoardResponseDto,
  GetCommentListResponseDto,
  GetFavoriteListResponseDto,
  PostCommentResponseDto,
  PutFavoriteResponseDto,
} from "@/pages/api/response/board";
import { ResponseDto } from "@/pages/api/response";
import { useCookies } from "react-cookie";
import { PostCommentRequestDto } from "@/pages/api/request/board";

type boardProps = {
  board: Board;
};

export default function DetailBoardPage({ board }: boardProps) {
  const loginUser = useRecoilValue(CurrUserAtom);
  const isWriter = loginUser?.email === board.writerEmail;
  const router = useRouter();
  const [cookies, setCookies] = useCookies();

  const BoardDetailTop = () => {
    const [showMore, setShowMore] = useState<boolean>(false);

    const deleteBoardResponse = (
      responseBody: DeleteBoardResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code !== "SU") {
        alert("제대로된 접근이 아닙니다."+code);
        return;
      }
      router.push(MAIN_PATH());
    };

    const onNicknameClickHander = () => {
      if (!board) return;
      router.push(USER_PATH(board.writerEmail));
    };

    const onMoreButtonClickHandler = () => {
      setShowMore((pre) => !pre);
    };

    const onUpdateButtonClickHandler = () => {
      if (!board || !loginUser) return;
      if (loginUser.email !== board.writerEmail) return;
      router.push(
        BOARD_WRITE_PATH() + "/" + BOARD_UPDATE_PATH(board.boardNumber)
      );
    };

    const onDelteButtonClickHandler = () => {
      if (!board || !loginUser || !cookies.accessToken) return;
      if (loginUser.email !== board.writerEmail) return;
      deleteBoardRequest(board.boardNumber, cookies.accessToken).then(
        (response) => deleteBoardResponse(response)
      );
      router.push(MAIN_PATH());
    };

    if (!board) return <div>게시물이 존재하지 않습니다.</div>;

    return (
      <div id={style["board-detail-top"]}>
        <div className={style["board-detail-top-header"]}>
          <div className={style["board-detail-title"]}>{board.title}</div>
          <div className={style["board-detail-top-sub-box"]}>
            <div
              className={style["board-detail-write-info-box"]}
              onClick={onNicknameClickHander}
            >
              <ProfileImageWithNickName
                writerDatetime={getElapsedTime(board.writeDatetime)}
                writerNickname={board.writerNickname}
                writerProfileImage={board ? board.writerProfileImage : null}
              />
            </div>
            {isWriter && (
              <IconButton
                icon="more-icon"
                onButtonClick={onMoreButtonClickHandler}
              />
            )}
            {showMore && (
              <div className={style["board-detail-more-box"]}>
                <div
                  className={style["board-detail-update-button"]}
                  onClick={onUpdateButtonClickHandler}
                >
                  수정
                </div>
                <hr />
                <div
                  className={style["board-detail-delete-button"]}
                  onClick={onDelteButtonClickHandler}
                >
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className={style["board-detail-top-main"]}>
          <div className={style["board-detail-main-text"]}>{board.content}</div>
          {board.boardImageList.map((imageSrc, idx) => (
            <img
              key={idx}
              className={style["board-detail-main-image"]}
              src={imageSrc}
            ></img>
          ))}
        </div>
      </div>
    );
  };

  const BoardDetailBottom = () => {
    const {commentList} = useComment(board.boardNumber);

    const [showFavorite, setShowFavorite] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(false);

    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [comment, setComment] = useState<string>();

    const postCommentResponse = (
      responseBody: PostCommentResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code !== "SU") {
        alert("실패입니다..");
        return;
      }
      //getCommentListRequest(board.boardNumber).then(getCommentListResponse);
    };

    const putFavoriteResponse = (
      responseBody: PutFavoriteResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code !== "SU") {
        alert("실패입니다..");
        return;
      }
      getFavoriteListRequest(board.boardNumber).then(getFavoriteListResponse);
    };

    const getFavoriteListResponse = (
      responseBody: GetFavoriteListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);
      if (
        -1 !==
        favoriteList.findIndex(
          (favorite) => favorite.email === loginUser?.email
        )
      ) {
        setIsFavorite(true);
      }
    };

    const onFavoriteClickHandler = () => {
      if (!loginUser || !cookies.accessToken) return;
      putFavoriteRequest(board.boardNumber, cookies.accessToken).then(
        (responseBody) => {
          putFavoriteResponse(responseBody);
        }
      );
      setIsFavorite((pre) => !pre);
    };
    const onCommentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target?.value);
      if (e.target == commentRef.current) {
        commentRef.current.style.height = "auto";
        commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
      }
    };

    const onCommentSubmitHandler = () => {
      console.log(comment, loginUser, cookies.accessToken);
      if (
        comment === "" ||
        comment === undefined ||
        !loginUser ||
        !cookies.accessToken
      )
        return;
      const requestBody: PostCommentRequestDto = { content: comment };
      postCommentRequest(
        board.boardNumber,
        requestBody,
        cookies.accessToken
      ).then(postCommentResponse);
    };

    const onShowClickHandler = (openTarget: string) => {
      if (openTarget === "favorite") {
        setShowFavorite((pre) => !pre);
      } else if (openTarget === "comment") {
        setShowComment((pre) => !pre);
      }
    };

    useEffect(() => {
      getFavoriteListRequest(board.boardNumber).then(getFavoriteListResponse);
    }, []);

    return (
      <div id={style["board-detail-bottom"]}>
        <div className={style["board-detail-bottom-button-box"]}>
          <div className={style["board-detail-bottom-favorite-container"]}>
            <IconComp
              icon={isFavorite ? "favorite-fill-icon" : "favorite-light-icon"}
              text={"좋아요"}
              totCount={favoriteList.length}
              isMoreShow={showFavorite}
              moreClick={() => onShowClickHandler("favorite")}
              onClick={onFavoriteClickHandler}
            />
            <IconComp
              icon={"comment-icon"}
              text={"댓글"}
              isMoreShow={showComment}
              moreClick={() => onShowClickHandler("comment")}
              totCount={commentList.length}
            />
          </div>
          {showFavorite && (
            <div className={style["board-detail-bottom-favorite-box"]}>
              <div className={style["board-detail-bottom-favorite-title"]}>
                {"좋아요"}
                <span className="emphasis">{favoriteList.length}</span>
              </div>
              <div className={style["board-detail-bottom-favorite-contents"]}>
                {favoriteList.map((item, idx) => (
                  <FavoriteItem key={idx} favoriteItem={item} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={style["board-detail-bottom-comment-box"]}>
          {showComment && (
            <div className={style["board-detail-bottom-comment-container"]}>
              <div className={style["board-detail-bottom-comment-title"]}>
                {"댓글"}
                <span className="emphasis">{commentList.length}</span>
              </div>
              <div
                className={style["board-detail-bottom-comment-list-container"]}
              >
                {commentList.map((item, idx) => (
                  <CommentItem key={idx} commentItem={item} />
                ))}
              </div>
            </div>
          )}
          <div className="divider"></div>
          <div className={style["board-detail-bottom-comment-pagination-box"]}>
            <Pagination />
          </div>
          {loginUser !== null ? (
            <div className={style["board-detail-bottom-comment-input-box"]}>
              <div
                className={style["board-detail-bottom-comment-input-container"]}
              >
                <textarea
                  className={style["board-detail-bottom-comment-textarea"]}
                  placeholder="댓글을 작성해주세요"
                  ref={commentRef}
                  value={comment}
                  onChange={onCommentChangeHandler}
                />
                <div
                  className={style["board-detail-bottom-comment-button-box"]}
                >
                  <Button
                    isDisable={comment === undefined || comment === ""}
                    color="black"
                    onClick={onCommentSubmitHandler}
                  >
                    댓글달기
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>login 하고 댓글달기</div>
          )}
        </div>
      </div>
    );
  };

  type IconGroupProps = {
    icon: string;
    text: string;
    totCount?: number;
    isMoreShow?: boolean;
    moreClick?: (e: MouseEventHandler) => void;
    onClick?: () => void;
  };

  const IconComp = ({
    icon,
    text,
    totCount,
    isMoreShow,
    moreClick,
    onClick,
  }: IconGroupProps) => {
    return (
      <div className={style["board-detail-bottom-button-group"]}>
        <div id={icon} className={style["icon-button"]} onClick={onClick}>
          <Icon icon={icon}></Icon>
        </div>
        <div
          className={style["board-detail-bottom-button-text"]}
          onClick={onClick}
        >
          {text}
          <span className="emphasis">{totCount}</span>
        </div>
        <Icon
          icon={isMoreShow ? "up-light-icon" : "down-light-icon"}
          onClick={moreClick}
        ></Icon>
      </div>
    );
  };

  return (
    <MainLayout path="">
      <div id={style["board-detail-wrapper"]}>
        <div className={style["board-detail-container"]}>
          <BoardDetailTop />
          <BoardDetailBottom />
        </div>
      </div>
    </MainLayout>
  );
}

// 이 함수는 서버에서 실행되어 페이지의 초기 props를 결정합니다.
export async function getServerSideProps(context: any) {
  const boardNumber = context.query.boardNumber as string;
  const board = await getBoardRequest(boardNumber);

  await increaseViewCountRequest(boardNumber);
  return {
    props: {
      board: board,
    },
  };
}
