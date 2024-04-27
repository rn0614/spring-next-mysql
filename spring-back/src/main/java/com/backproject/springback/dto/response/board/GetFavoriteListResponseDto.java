package com.backproject.springback.dto.response.board;

import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.repository.resultSet.GetFavoriteListResultSet;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backproject.springback.common.ResponseCode;
import com.backproject.springback.common.ResponseMessage;
import com.backproject.springback.dto.object.FavoriteListItem;

import lombok.Getter;

@Getter
public class GetFavoriteListResponseDto extends ResponseDto {
  
  private List<FavoriteListItem> FavoriteList;

  private GetFavoriteListResponseDto(List<GetFavoriteListResultSet> resultSet){
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.FavoriteList = FavoriteListItem.copyItem(resultSet);
  }

  public static ResponseEntity<GetFavoriteListResponseDto> success(List<GetFavoriteListResultSet> resultSet){
    GetFavoriteListResponseDto result = new GetFavoriteListResponseDto(resultSet);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
