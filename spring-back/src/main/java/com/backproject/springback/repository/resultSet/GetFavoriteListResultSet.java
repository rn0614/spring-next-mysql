package com.backproject.springback.repository.resultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetFavoriteListResultSet {
  private String email;
  private String nickname;
  private String profileImage;
}
