package com.backproject.springback.service.implement;

import com.backproject.springback.dto.request.user.PatchNicknameRequestDto;
import com.backproject.springback.dto.request.user.PatchProfileImageRequestDto;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.user.GetSignInUserResponseDto;
import com.backproject.springback.dto.response.user.GetUserResponseDto;
import com.backproject.springback.dto.response.user.PatchNicknameResponseDto;
import com.backproject.springback.dto.response.user.PatchProfileImageResponseDto;
import com.backproject.springback.entity.UserEntity;
import com.backproject.springback.repository.UserRespository;
import com.backproject.springback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

  private final UserRespository userRespository;

  @Override
  public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(
    String email
  ) {
    UserEntity userEntity = null;

    try {
      userEntity = userRespository.findByEmail(email);
      if (userEntity == null) return GetSignInUserResponseDto.noExistUser();

      return GetSignInUserResponseDto.success(userEntity);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super GetUserResponseDto> getUser(String email) {
    try {
      UserEntity userEntity = userRespository.findByEmail(email);
      if (userEntity == null) return GetUserResponseDto.noExistUser();
      return GetUserResponseDto.success(userEntity);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(
    PatchNicknameRequestDto dto,
    String email
  ) {
    try {
      UserEntity userEntity = userRespository.findByEmail(email);

      if (userEntity == null) return PatchNicknameResponseDto.noExistUser();
      String nickname = dto.getNickname();
      boolean existedNickname = userRespository.existsByNickname(email);

      if (existedNickname) return PatchNicknameResponseDto.duplicateNickname();

      userEntity.setNickname(nickname);
      userRespository.save(userEntity);

      return PatchNicknameResponseDto.success();

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(
    PatchProfileImageRequestDto dto,
    String email
  ) {
    try {
      UserEntity userEntity = userRespository.findByEmail(email);
      if(userEntity== null) return PatchProfileImageResponseDto.noExistUser();

      String profileImage = dto.getProfileImage();
      userEntity.setProfileImage(profileImage);
      userRespository.save(userEntity);
      return PatchProfileImageResponseDto.success();
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }
}
