import React, { useState, useCallback, useRef } from "react";
import { DndProvider, useDrag, useDrop, XYCoord } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cloneDeep } from "lodash";
import styles from "./Table.module.scss";

type TableType<T> = {
  data: T[];
  columns: string[];
  setData: any;
  setOtherData: any;
};

interface DraggableRowProps<T> {
  dataItem: T;
  columns: string[];
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableRow = <T extends {}>({
  dataItem,
  columns,
  index,
  moveRow,
}: DraggableRowProps<T>) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [, drop] = useDrop({
    accept: "row",
    hover(item: { type: string; index: number, id }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveRow(item.id, dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: () => {
      return { index, id:dataItem.id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {columns.map((column, idx) => (
        <td key={idx}>{(dataItem as any)[column]}</td>
      ))}
    </tr>
  );
};

const Table = <T extends {}>({
  data,
  columns,
  setData,
  setOtherData,
}: TableType<T>) => {
  const moveRow = useCallback((draggingItemId:number,dragIndex: number, hoverIndex: number) => {
    setData((prevRows) => {
      const existingId = prevRows.some((item)=>item.id===draggingItemId);
      const newRows = cloneDeep(prevRows);
      if(existingId){
        const [removed] = newRows.splice(dragIndex, 1);
        newRows.splice(hoverIndex, 0, removed);
        return newRows;
      }else{
        const [removed] = newRows.splice(dragIndex, 1);
        newRows.splice(hoverIndex, 0);
        return newRows;
      }
    });
    setOtherData((prevRows) => {
      const existingId = prevRows.some((item)=>item.id===draggingItemId);
      console.log('existingId',existingId);
      const newRows = cloneDeep(prevRows);
      const [removed] = newRows.splice(dragIndex, 1);
      newRows.splice(hoverIndex, 0, removed);
      return newRows;
    });
  }, [setData, setOtherData]);

  return (
    <DndProvider backend={HTML5Backend}>
      <table className={styles["table"]}>
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataItem, index) => (
            <DraggableRow
              key={index}
              dataItem={dataItem}
              columns={columns}
              index={index}
              moveRow={moveRow}
            />
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};

export default Table;
