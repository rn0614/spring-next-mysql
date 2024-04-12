import { ResponseDto } from "@/pages/api/response";
import { Board } from "@/types/interface";

export default interface GetBoardResponseDto extends ResponseDto, Board{

}