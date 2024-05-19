import React, { useRef } from "react";
import DropArea from "../DropArea/DropArea";
import styles from "./DropWrapper.module.scss";

type DropWrapperProps<T> = {
  areaList: T[];
  addBox: any;
  wrapperNo: number;
};

export default function DropWrapper<
  T extends { startTime: number; id: number }
>({ areaList, addBox, wrapperNo }: DropWrapperProps<T>) {
  const ref = useRef<HTMLTableRowElement>(null);
  const wrapperList = Array.from({ length: 10 }, (v, k) => k + 9);
  const resultList = wrapperList.map((time) => {
    // areaList에서 해당 시간과 일치하는 요소 찾기
    const found = areaList.find((area) => area.startTime === time) ?? null;
    // 일치하는 요소가 있으면 그 요소의 id를 사용, 없으면 null
    return {
      time,
      data: found,
    };
  });

  const dropCheckHandler = (data: any, item: any, monitor: any) => {
    let diff = Math.floor(
      (monitor.getInitialClientOffset()!.y -
        monitor.getInitialSourceClientOffset()!.y) /
        20
    );
    let downsideCheck = data.time - diff;
    let upsideCheck =
      data.time + item.data.endTime - item.data.startTime - diff;
    let check = resultList.every((row) => {
      if (upsideCheck > 19 || downsideCheck < 9) return false;
      if (row.data?.id == item.data.id) return true;
      if (row.time >= upsideCheck || row.time < downsideCheck) return true;
      if (row.data === null) return true;
      return false;
    });
    return check;
  };

  return (
    <div ref={ref} className={styles["wrapper"]}>
      {wrapperList.map((_, idx) => (
        <DropArea
          key={idx}
          addBox={addBox}
          time={idx + 9}
          data={resultList[idx]}
          wrapperNo={wrapperNo}
          dropCheckHandler={dropCheckHandler}
        ></DropArea>
      ))}
    </div>
  );
}
