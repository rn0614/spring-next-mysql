import { BoardListItemType } from "@/types/interface";
import ResponseDto from "../response.dto";

export default interface GetSearchBoardListResponseDto extends ResponseDto{
  searchList: BoardListItemType[];
}