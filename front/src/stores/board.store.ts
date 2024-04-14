import { atom } from "recoil";

export type Board = {
  boardNumber?:number;
  title: string;
  content: string;
  boardImageFileList: File[];
};

export const CurBoardAtom = atom<Board | null>({
  key: "CurBoard",
  default: null,
});

/*
{
  boardNumber: 0,
  title: "",
  content: "",
  boardTitleImage: null,
  favoriteCount: 0,
  commentCounter: 0,
  viewCount: 0,
  writerDatetime: "",
  writerNickname: "",
  writerProfileImage: null,
}*/
