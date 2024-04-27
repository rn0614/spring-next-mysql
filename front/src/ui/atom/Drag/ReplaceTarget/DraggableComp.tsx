import React from 'react';

interface DraggableTargetProps {
  id: string;
  type: string; // 추가된 type 속성
  children: React.ReactNode;
}

const DraggableTarget: React.FC<DraggableTargetProps> = ({ id, type, children }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", id);
    event.dataTransfer.setData("type", type);
  };

  return (
    <div id={id} draggable={true} onDragStart={handleDragStart}>
      {children}
    </div>
  );
};

export default DraggableTarget;