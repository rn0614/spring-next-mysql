import React, { useMemo, useState } from "react";
import style from "./style.module.scss";
import DraggableTarget from "@/ui/atom/Drag/ReplaceTarget/DraggableComp";
import DraggableArea from "@/ui/atom/Drag/ReplaceTarget/DraggableAreaComp";

interface Item {
  id: string;
  content: string;
}

const TestPage: React.FC = () => {
  const numWrappers = 3; // 원하는 래퍼 개수
  const wrapperRefs = useMemo(
    () =>
      Array.from({ length: numWrappers }, () =>
        React.createRef<HTMLDivElement>()
      ),
    []
  );

  const [list, setList] = useState<Item[]>([
    { id: "item1", content: "Item 1" },
    { id: "item2", content: "Item 2" },
    { id: "item3", content: "Item 3" },
  ]);

  return (
    <div>
      <div className={style["wrapper-container"]}>
        {wrapperRefs.map((ref, index) => (
          <DraggableArea key={index} ref={ref}  />
        ))}
      </div>

      {list.map((item) => (
        <DraggableTarget type={item.id} key={item.id} id={item.id}>
          <div>target {item.id}</div>
        </DraggableTarget>
      ))}
    </div>
  );
};


export default TestPage;
