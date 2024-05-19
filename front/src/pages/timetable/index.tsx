import React, { useState, useCallback } from "react";
import { DndProvider, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./styles.module.scss";
import { cloneDeep } from "lodash";
import DropWrapper from "@/ui/atom/DropWrapper/DropWrapper";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import TimeSchedule from "@/types/timeSchedule";


const initItem = [
  [
    {
      id: 1,
      text: "box1",
      startTime: 9,
      endTime: 12,
      wrapperNo: 0,
      isChange: false,
    },
    {
      id: 3,
      text: "box3",
      startTime: 15,
      endTime: 17,
      wrapperNo: 0,
      isChange: false,
    },
  ],
  [
    {
      id: 4,
      text: "box4",
      startTime: 10,
      endTime: 15,
      wrapperNo: 1,
      isChange: false,
    },
    {
      id: 6,
      text: "box6",
      startTime: 17,
      endTime: 18,
      wrapperNo: 1,
      isChange: false,
    },
  ],
  [
    {
      id: 7,
      text: "box7",
      startTime: 9,
      endTime: 10,
      wrapperNo: 2,
      isChange: false,
    },
    {
      id: 8,
      text: "box8",
      startTime: 14,
      endTime: 15,
      wrapperNo: 2,
      isChange: false,
    },
    {
      id: 9,
      text: "box9",
      startTime: 16,
      endTime: 18,
      wrapperNo: 2,
      isChange: false,
    },
  ],
];

export default function DragDropPage() {
  const [wrapper, setWrapper] = useState<any>(initItem);

  const addBox = useCallback(
    (
      time: number,
      item: any,
      monitor: DropTargetMonitor<unknown, unknown>,
      wrapperNo: number
    ) => {
      let diff = Math.floor(
        (monitor.getInitialClientOffset()!.y -
          monitor.getInitialSourceClientOffset()!.y) /
          20
      );
      setWrapper((preRows: TimeSchedule[][]) => {
        let itemToMove = cloneDeep(preRows);
        // 전체 배열을 순회하며 요소 찾기
        itemToMove.forEach((group:TimeSchedule[]) => {
          const itemIndex = group.findIndex((row) => item.id === row.id);
          if (itemIndex !== -1) {
            // 요소를 찾았으면 제거
            group.splice(itemIndex, 1)[0];
          }
        });

        // 찾은 요소를 지정된 배열 번호의 리스트에 추가
        if (wrapperNo < wrapper.length) {
          itemToMove[wrapperNo].push({
            id: item.id,
            text: item.text,
            startTime: time - diff,
            endTime: time + item.data.endTime - item.data.startTime - diff,
            wrapperNo: wrapperNo,
            isChange: true,
          });
        }
        console.log("itemToMove", itemToMove);
        return itemToMove;
      });
    },
    [wrapper]
  );

  return (
    <MainLayout path="home">
      <DndProvider backend={HTML5Backend}>
        <div className={styles["sheet-wrapper"]}>
          <DropWrapper areaList={wrapper[0]} addBox={addBox} wrapperNo={0} />
          <DropWrapper areaList={wrapper[1]} addBox={addBox} wrapperNo={1} />
          <DropWrapper areaList={wrapper[2]} addBox={addBox} wrapperNo={2} />
        </div>
      </DndProvider>
    </MainLayout>
  );
}
