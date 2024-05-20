package com.backproject.springback.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="schedule")
@Table(name="schedule")
public class ScheduleEntity {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String text;
  private int startTime;
  private int endTime;
  private String type;
}
