import { useRef } from "react";
import styles from "./DragBox.module.scss";
import { useDrag } from "react-dnd";

type DragBoxProps ={

}

export default function DragBox({ id, text, time, data, size }:any) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isDragging, clientOffset, sourceClientOffset}, drag] = useDrag({
    type: "row",
    item: () => {
      return { id: id, text, time, data };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset : monitor.getInitialClientOffset(),
      sourceClientOffset :monitor.getInitialSourceClientOffset(),
    })
  });

  drag(ref);

  return (
    <div
      ref={ref}
      className={styles["box"]}
      style={{ opacity: isDragging ? 0.5 : 1 , zIndex:isDragging?0:1, height:size*20+"px"}}
      onClick={()=>console.log(size)}
    >
      {text}
    </div>
  );
}
