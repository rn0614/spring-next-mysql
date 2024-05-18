import React, { useState, useRef, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./styles.module.scss";
import { cloneDeep } from "lodash";

const initItem = [
  [
    { id: 1, text: "box1", time: 9 },
    { id: 2, text: "box2", time: 10 },
    { id: 3, text: "box3", time: 15 },
  ],
  [
    { id: 4, text: "box4", time: 16 },
    { id: 5, text: "box5", time: 17 },
    { id: 6, text: "box6", time: 18 },
  ],
  [
    { id: 7, text: "box7", time: 10 },
    { id: 8, text: "box8", time: 14 },
    { id: 9, text: "box9", time: 16 },
  ],
];

export default function DragDropPage() {
  const [boxes, setBoxes] = useState(initItem);
  const [wrapper, setWrapper] = useState<any>(initItem);

  const addBox = useCallback((time, item, monitor, wrapperNo) => {
    setWrapper((preRows) => {
      let itemToMove = cloneDeep(preRows);
      // 전체 배열을 순회하며 요소 찾기
      itemToMove.forEach((group, index) => {
        const itemIndex = group.findIndex(row => item.id === row.id);
        if (itemIndex !== -1) {
          // 요소를 찾았으면 제거
          group.splice(itemIndex, 1)[0];
        }
      });
    
      // 찾은 요소를 지정된 배열 번호의 리스트에 추가
      if ( wrapperNo < initItem.length) {
        itemToMove[wrapperNo].push({ id: item.id, text: item.text, time: time });
      }
      console.log('itemToMove',itemToMove)
      return itemToMove;
    });

/*
      const newRows = cloneDeep(preRows).filter((row) => item.id !== row.id);
      newRows.push({ id: item.id, text: item.text, time: time });
      return newRows;*/
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles["sheet-wrapper"]}>
        <DropWrapper areaList={wrapper[0]} addBox={addBox} wrapperNo={0}/>
        <DropWrapper areaList={wrapper[1]} addBox={addBox} wrapperNo={1} />
        <DropWrapper areaList={wrapper[2]} addBox={addBox} wrapperNo={2} />
      </div>
      <div>
        {boxes.map((item, idx) => (
          <Box key={item.id} id={item.id} text={item.text} time={item.time} />
        ))}
      </div>
    </DndProvider>
  );
}

function Box({ id, text, time }) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: () => {
      return { id: id, text, time };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className={styles["box"]}
      style={{ backgroundColor: isDragging ? "red" : "white" }}
    >
      {text}
    </div>
  );
}

function DropWrapper({ areaList, addBox, wrapperNo }) {
  const ref = useRef<HTMLTableRowElement>(null);
  const wrapperList = Array.from({ length: 10 }, (v, k) => k + 9);
  const resultList = wrapperList.map((time) => {
    // areaList에서 해당 시간과 일치하는 요소 찾기
    const found = areaList.find((area) => area.time === time);

    // 일치하는 요소가 있으면 그 요소의 id를 사용, 없으면 null
    return {
      time,
      id: found ? found.id : null,
      text: found ? found.text : null,
    };
  });
  return (
    <div ref={ref} className={styles["wrapper"]}>
      {wrapperList.map((_, idx) => (
        <DropArea
          key={idx}
          addBox={addBox}
          time={idx + 9}
          data={resultList[idx]}
          wrapperNo={wrapperNo}
        ></DropArea>
      ))}
    </div>
  );
}

function DropArea({ addBox, data, time, wrapperNo }) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver,canDrop }, drop] = useDrop(() => ({
    accept: "row",
    drop: (item, monitor) => addBox(time, item, monitor, wrapperNo),
    canDrop: () => (data.id===null||data.id===undefined),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    }),
  }),[data]);

  drop(ref);
  return (
    <div
      ref={ref}
      className={styles["area"]}
      onClick={() => console.log(data,data.id===null,canDrop)}
    >
      <div className={`${styles["time"]} ${canDrop?styles["droppable"]:styles["drop-disable"] }`}>{time}</div>
      {data.id ? (
        <Box id={data.id} text={data.text} time={time}></Box>
      ) : null}
    </div>
  );
}
