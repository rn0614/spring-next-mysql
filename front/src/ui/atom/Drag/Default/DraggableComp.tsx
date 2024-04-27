interface DraggableTargetProps {
  id: string;
  children: React.ReactNode;
}

const DraggableTarget: React.FC<DraggableTargetProps> = ({ id, children }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", id);
  };

  return (
    <div id={id} draggable={true} onDragStart={handleDragStart}>
      {children}
    </div>
  );
};
export default DraggableTarget;
