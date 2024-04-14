import dayjs from "dayjs";

export const convertDayFormat = (
  day: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  const date = dayjs(day);
  return date.format("YYYY. MM. DD.");
};

export const getElapsedTime = (
  fromTime: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  const now = dayjs();
  const targetTime = dayjs(fromTime);

  const gap = now.diff(targetTime, "s");
  if (gap < 60) return `${gap}초 전`;
  if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
  if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
  return `${Math.floor(gap / 86400)}일 전`;
};
