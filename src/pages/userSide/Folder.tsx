import React, { useRef, useState } from 'react';

interface FolderProps {
  title: string;
  content: React.ReactNode;
}

const Folder: React.FC<FolderProps> = ({ title, content }) => {
  const folderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Handle dragging
  const onDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = folderRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (isDragging && folderRef.current) {
      folderRef.current.style.left = `${e.clientX - position.x}px`;
      folderRef.current.style.top = `${e.clientY - position.y}px`;
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  // Handle resizing
  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResizeMove = (e: React.MouseEvent) => {
    if (isResizing && folderRef.current) {
      setSize({
        width: e.clientX - folderRef.current.getBoundingClientRect().left,
        height: e.clientY - folderRef.current.getBoundingClientRect().top,
      });
    }
  };

  const onResizeEnd = () => {
    setIsResizing(false);
  };

  return (
    <div
      ref={folderRef}
      className="fixed bg-white shadow-lg border border-gray-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onMouseMove={onDragMove}
      onMouseUp={() => {
        onDragEnd();
        onResizeEnd();
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center p-2 bg-blue-500 text-white cursor-move"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
      >
        <span>{title}</span>
        <button className="px-2" onClick={() => folderRef.current?.remove()}>
          ✖
        </button>
      </div>

      {/* Content */}
      <div className="p-2 overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
        {content}
      </div>

      {/* Resizer */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 cursor-se-resize"
        onMouseDown={onResizeStart}
        onMouseUp={onResizeEnd}
        onMouseMove={onResizeMove}
      ></div>
    </div>
  );
};

export default Folder;
