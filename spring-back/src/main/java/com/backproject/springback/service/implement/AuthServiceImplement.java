package com.backproject.springback.service.implement;

import com.backproject.springback.dto.request.auth.SignInRequestDto;
import com.backproject.springback.dto.request.auth.SignUpRequestDto;
import com.backproject.springback.dto.response.ResponseDto;
import com.backproject.springback.dto.response.auth.SignInResponseDto;
import com.backproject.springback.dto.response.auth.SignUpResponseDto;
import com.backproject.springback.entity.UserEntity;
import com.backproject.springback.repository.UserRespository;
import com.backproject.springback.service.AuthService;
import com.backproject.springback.provider.JwtProvider;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

  private final UserRespository userRespository;
  private final JwtProvider jwtProvider;
  private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @Override
  public ResponseEntity<? super SignUpResponseDto> signUp(
    SignUpRequestDto dto
  ) {
    try {
      //제약조건 검사
      String email = dto.getEmail();
      boolean existedEmail = userRespository.existsByEmail(email);
      if (existedEmail) return SignUpResponseDto.duplicateEmail();

      String nickname = dto.getNickname();
      boolean existedNickname = userRespository.existsByNickname(nickname);
      if (existedNickname) return SignUpResponseDto.duplicateNickname();

      String telNumber = dto.getTelNumber();
      boolean existedTelNumber = userRespository.existsByTelNumber(telNumber);
      if (existedTelNumber) return SignUpResponseDto.duplicateTelNumber();

      // 암호화
      String password = dto.getPassword();
      String encodedPassword = passwordEncoder.encode(password);
      dto.setPassword(encodedPassword);

      UserEntity userEntity = new UserEntity(dto);
      userRespository.save(userEntity);

      return SignUpResponseDto.succes();
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
  }

  @Override
  public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
    String token = null;

    try{
      String email = dto.getEmail();
      UserEntity userEntity = userRespository.findByEmail(email);
      if(userEntity==null) return SignInResponseDto.signInFailed();

      String password = dto.getPassword();
      String encodedPassword = userEntity.getPassword();
      boolean isMatched = passwordEncoder.matches(password, encodedPassword); // 받은 패스워드와 인코딩된 패스워드 검증
      if(!isMatched) return SignInResponseDto.signInFailed();

      token = jwtProvider.create(email);
      return SignInResponseDto.success(token);
    }catch(Exception exception){
      return ResponseDto.databaseError();
    }
  }
}
