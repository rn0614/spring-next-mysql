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
import { Board } from "@/types/interface";
import CommentItem from "@/components/CommentItem";
import Button from "@/ui/atom/Button/Button";
import Pagination from "@/components/Pagination";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import { ProfileImageWithNickName } from "@/ui/atom/ProfileImage/ProfileImage";
import { useRecoilValue } from "recoil";
import { CurrUserAtom } from "@/stores/login-user.store";
import { useRouter } from "next/router";
import { BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from "@/constants";
import { useGetCommentList, usePostComment } from "@/hooks/useComment";
import { getElapsedTime } from "@/utils/day";
import { useCookies } from "react-cookie";
import { PostCommentRequestDto } from "@/pages/api/request/board";
import {
  useDeleteBoard,
  getBoardRequest,
  increaseViewCountRequest,
} from "@/hooks/useBoard";
import { useGetFavoriteList, usePutFavorite } from "@/hooks/useFavorite";

type boardProps = {
  board: Board;
};

export default function DetailBoardPage({ board }: boardProps) {
  const loginUser = useRecoilValue(CurrUserAtom);
  const isWriter = loginUser?.email === board.writerEmail;
  const router = useRouter();
  const [cookies, setCookies] = useCookies();

  const BoardDetailTop = () => {
    const deleteBoard = useDeleteBoard();
    const [showMore, setShowMore] = useState<boolean>(false);

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
      router.push(BOARD_UPDATE_PATH(board.boardNumber));
    };

    const onDelteButtonClickHandler = () => {
      if (!board || !loginUser || !cookies.accessToken) return;
      if (loginUser.email !== board.writerEmail) return;
      deleteBoard(board.boardNumber);
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
    const [showFavorite, setShowFavorite] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [comment, setComment] = useState<string>();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);

    const commentRef = useRef<HTMLTextAreaElement>(null);

    const commentList = useGetCommentList({
      boardNumber: board.boardNumber,
      limit: limit,
      page: page,
    });
    const postComment = usePostComment();
    const putFavorite = usePutFavorite();
    const favoriteList = useGetFavoriteList(board.boardNumber);

    const onFavoriteClickHandler = () => {
      if (!loginUser || !cookies.accessToken) {
        alert("로그인 후 좋아요가 가능합니다.");
        return;
      }
      putFavorite(board.boardNumber);
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
      if (
        comment === "" ||
        comment === undefined ||
        !loginUser ||
        !cookies.accessToken
      )
        return;
      const requestBody: PostCommentRequestDto = { content: comment };
      postComment({ boardNumber: board.boardNumber, requestBody });
      setComment("");
    };

    const onShowClickHandler = (openTarget: string) => {
      if (openTarget === "favorite") {
        setShowFavorite((pre) => !pre);
      } else if (openTarget === "comment") {
        setShowComment((pre) => !pre);
      }
    };
    useEffect(() => {
      if (
        -1 !==
        favoriteList.findIndex(
          (favorite) => favorite.email === loginUser?.email
        )
      ) {
        setIsFavorite(true);
      }
    }, [favoriteList]);
    useEffect(() => {
      console.log("commentList", commentList);
    }, [commentList]);

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
              totCount={commentList[0] ? commentList[0].totalCount : 0}
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
                <span className="emphasis">
                  {commentList[0] ? commentList[0].totalCount : 0}
                </span>
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
            <Pagination
              curPage={page}
              limit={limit}
              totalPage={
                commentList[0]
                  ? Math.ceil((+commentList[0].totalCount + 1) / limit)
                  : 1
              }
              setPage={setPage}
              setLimit={setLimit}
              onLimitChange={() => {}}
            />
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
                    disabled={comment === undefined || comment === ""}
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
  try {
    const boardNumber = context.query.boardNumber as string;
    
    const board = await getBoardRequest(boardNumber);

    await increaseViewCountRequest(boardNumber);
    return {
      props: {
        board: board,
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
