package com.backproject.springback.common;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class TimeUtil {

  private static final ZoneId KST_ZONE = ZoneId.of("Asia/Seoul");
  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

  // 현재 시간을 KST로 변환하여 ZonedDateTime으로 반환
  public static ZonedDateTime getCurrentKSTTime() {
      return Instant.now().atZone(KST_ZONE);
  }

  // 현재 시간을 KST로 변환하여 포맷된 문자열로 반환
  public static String getCurrentKSTTimeString() {
      return getCurrentKSTTime().format(FORMATTER);
  }
}