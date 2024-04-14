package com.backproject.springback.dto.object;

import com.backproject.springback.repository.resultSet.GetCommentListResultSet;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentListItem {

  private String nickname;
  private String profileImage;
  private String writeDatetime;
  private String content;
  private String totalCount;

  public CommentListItem(GetCommentListResultSet resultSet) {
    this.nickname = resultSet.getNickname();
    this.profileImage = resultSet.getProfileImage();
    this.writeDatetime = resultSet.getWriteDatetime();
    this.content = resultSet.getContent();
    this.totalCount = resultSet.getTotalCount();
  }

  public static List<CommentListItem> copyItem(
    List<GetCommentListResultSet> resultSets
  ) {
    List<CommentListItem> list = new ArrayList<>();
    for (GetCommentListResultSet resultSet : resultSets) {
      CommentListItem commentListItem = new CommentListItem(resultSet);
      list.add(commentListItem);
    }
    return list;
  }
}
