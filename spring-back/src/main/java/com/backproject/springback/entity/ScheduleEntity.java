package com.backproject.springback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
