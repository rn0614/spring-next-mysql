import React, { useRef } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import styles from "./DropArea.module.scss";
import DragBox from "../DragBox/DragBox";

type DropAreaType<T> = {
  addBox: (
    time: number,
    item: any,
    monitor: DropTargetMonitor<unknown, unknown>,
    wrapperNo: number
  ) => void;
  data: any;
  time: number;
  wrapperNo: number;
  dropCheckHandler: any;
};

export default function DropArea<T>({
  addBox,
  data,
  time,
  wrapperNo,
  dropCheckHandler,
}: DropAreaType<T>) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "row",
      drop: (item, monitor) => addBox(time, item, monitor, wrapperNo),
      canDrop: (item, monitor) => dropCheckHandler(data, item, monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [data]
  );

  drop(ref);

  const color = (() => {
    if (isOver && !canDrop) return "drop-disable";
    if (!isOver && canDrop) return "drop-possible";
    if (isOver && canDrop) return "drop-cursor";
    return "";
  })();

  return (
    <div
      ref={ref}
      className={`${styles["area"]} ${color !== "" ? styles[color] : ""}`}
      onClick={() => console.log(data, data.id === null, canDrop)}
    >
      <div className={`${styles["time"]}`}>{time}</div>
      {data?.data?.id ? (
        <DragBox
          id={data.data.id}
          text={data.data.text}
          time={time}
          data={data.data}
          size={data.data.endTime - data.data.startTime}
        ></DragBox>
      ) : null}
    </div>
  );
}
