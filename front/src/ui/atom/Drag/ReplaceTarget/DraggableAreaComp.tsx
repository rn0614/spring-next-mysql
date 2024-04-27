import React, { DragEvent, forwardRef, useState } from 'react';

interface DraggableAreaProps {
  children?: React.ReactNode;
}

const DraggableArea = forwardRef<HTMLDivElement, DraggableAreaProps>((props, ref) => {
  const { children } = props;
  const [items, setItems] = useState([]);
  const [draggedId, setDraggedId] = useState<string>("");

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent, id: string, type: string) => {
    event.dataTransfer.setData("text", id); // 이 요소의 ID를 설정
    event.dataTransfer.setData("type", type); // 이 요소의 타입을 설정
    setDraggedId(id);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.effectAllowed = 'move';
    const draggableElementId = event.dataTransfer.getData("text");
    const draggableElementType = event.dataTransfer.getData("type");

    if (ref && 'current' in ref) {
      const newElement = document.createElement("div");
      newElement.id = `new-${draggableElementId}-${Date.now()}`; // 유니크한 ID 할당
      newElement.textContent = `This is a ${draggableElementType} box`;
      newElement.style.width = "100px";
      newElement.style.height = "100px";
      newElement.style.color = "white";
      newElement.style.display = "flex";
      newElement.style.alignItems = "center";
      newElement.style.justifyContent = "center";
      newElement.style.backgroundColor = draggableElementType === "red" ? "red" : draggableElementType === "blue" ? "blue" : "gray";
      newElement.draggable = true; // 드래그 가능하게 설정
      newElement.addEventListener('dragstart', (e:any) => handleDragStart(e, newElement.id, draggableElementType));

      (ref as React.MutableRefObject<HTMLDivElement>).current.appendChild(newElement);
    }
  };

  return (
    <div ref={ref} onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
});

DraggableArea.displayName = 'DraggableArea';

export default DraggableArea;