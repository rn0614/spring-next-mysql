export default interface BoardListItemType {
  boardNumber: number;
  title: string;
  content: string;
  boardTitleImage: string | null;
  favoriteCount: number;
  commentCount: number;
  viewCount: number;
  writerDatetime: string;
  writerNickname: string;
  writerProfileImage: string | null;
}
