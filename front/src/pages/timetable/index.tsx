import React, { useState, useCallback, useEffect } from "react";
import { DndProvider, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./styles.module.scss";
import { cloneDeep } from "lodash";
import DropWrapper from "@/ui/atom/DropWrapper/DropWrapper";
import MainLayout from "@/layouts/Layout/MainLayout/MainLayout";
import TimeSchedule from "@/types/timeSchedule";
import { timeScheduleMock } from "@/mocks/time-schedule-list.mock";
import Button from "@/ui/atom/Button/Button";
import { useScheduler } from "@/hooks/useSchedule";

const changeData = (inputData:any) => {
  // Creating a Map to group data by type
  const groupedByType = new Map();

  // Filling the map with data grouped by type
  inputData.forEach((item:any) => {
    if (!groupedByType.has(item.type)) {
      groupedByType.set(item.type, []);
    }
    groupedByType.get(item.type).push(item);
  });

  return Array.from(groupedByType.values());
};

export default function DragDropPage() {
  const scheduleList = useScheduler();
  const [wrapper, setWrapper] = useState<any>(changeData(timeScheduleMock));
  const addBox = useCallback(
    (
      time: number,
      item: any,
      monitor: DropTargetMonitor<unknown, unknown>,
      type: string
    ) => {
      let diff = Math.floor(
        (monitor.getInitialClientOffset()!.y -
          monitor.getInitialSourceClientOffset()!.y) /
          20
      );
      setWrapper((preRows: TimeSchedule[][]) => {
        let itemToMove = cloneDeep(preRows);
        // 전체 배열을 순회하며 요소 찾기
        itemToMove.forEach((group: TimeSchedule[]) => {
          const itemIndex = group.findIndex((row) => item.id === row.id);
          if (itemIndex !== -1) {
            // 요소를 찾았으면 제거
            group.splice(itemIndex, 1)[0];
          }
        });

        // 찾은 요소를 지정된 배열 번호의 리스트에 추가
        if (type < wrapper.length) {
          itemToMove[+type].push({
            id: item.id,
            text: item.text,
            startTime: time - diff,
            endTime: time + item.data.endTime - item.data.startTime - diff,
            type: type,
            isChange: true,
          });
        }
        return itemToMove;
      });
    },
    [wrapper]
  );

  useEffect(()=>{
    if(scheduleList&& scheduleList.length>0){
      console.log(changeData(scheduleList));
      setWrapper(changeData(scheduleList));
    }
  },[scheduleList])
  return (
    <MainLayout path="home">
      <DndProvider backend={HTML5Backend}>
        <div className={styles["time-schedule-top"]}>
          <div className={styles["sheet-wrapper"]}>
            <div className={styles["time-wrapper"]}>
              {Array.from({ length: 26 }, (v, k) => k - 1).map((item) => (
                <div
                  key={item}
                  style={{
                    height: "20px",
                    backgroundColor: "rgb(178, 178, 178)",
                    textAlign: "right",
                    paddingRight: "5px",
                  }}
                >
                  {item >= 0 ? item : null}
                </div>
              ))}
            </div>
            <DropWrapper areaList={wrapper[0]} addBox={addBox} type={"0"} />
            <DropWrapper areaList={wrapper[1]} addBox={addBox} type={"1"} />
            <DropWrapper areaList={wrapper[2]} addBox={addBox} type={"2"} />
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log(wrapper);
            }}
          >
            전체 출력
          </Button>
        </div>
      </DndProvider>
    </MainLayout>
  );
}
