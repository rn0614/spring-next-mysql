import { forwardRef } from "react";

interface DraggableAreaProps {
  children?: React.ReactNode;
}

const DraggableArea = forwardRef<HTMLDivElement, DraggableAreaProps>((props, ref) => {
  const { children } = props;

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggableElementId = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(draggableElementId);
    if (draggableElement && ref && 'current' in ref) {
      (ref as React.MutableRefObject<HTMLDivElement>).current.appendChild(draggableElement);
    }
  };

  return (
    <div ref={ref} onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
});
DraggableArea.displayName="DraggableArea"


export default DraggableArea;