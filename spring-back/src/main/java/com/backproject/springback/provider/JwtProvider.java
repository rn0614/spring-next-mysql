package com.backproject.springback.provider;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

  @Value("${secret-key}")
  private String secretKey;

  /**
   *  jwt 토큰 생성부
   */
  public String create(String email) {
    Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));


    String jwt = Jwts
      .builder()
      .signWith(key, SignatureAlgorithm.HS256)
      .setSubject(email)
      .setIssuedAt(new Date())
      .setExpiration(expiredDate)
      .compact();
    return jwt;
  }

  /**
   *  jwt 토큰 유효성 검증
   */
  public String validate(String jwt) {
    Claims claims = null;
    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

    try {
      claims =
        Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
    } catch (Error exception) {
      exception.printStackTrace();
      return null;
    }
    return claims.getSubject();
  }
}
