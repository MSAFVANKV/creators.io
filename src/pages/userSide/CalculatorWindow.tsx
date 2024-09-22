import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Rnd } from "react-rnd";

type TodoWindowProps = {
  isVisible: boolean;
  onClose: () => void;
};

const CalculatorWindow: React.FC<TodoWindowProps> = ({ isVisible, onClose }) => {
  const [size, setSize] = useState({ width: 400, height: 300 }); // Default size
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Default position
  const [isFullScreen, setIsFullScreen] = useState(false); // Track if full screen
  const [originalSize, setOriginalSize] = useState({ width: 400, height: 300 });
  const [originalPosition, setOriginalPosition] = useState({ x: 100, y: 100 });

  const handleFitSize = () => {
    if (isFullScreen) {
      // Revert to original size and position
      setSize(originalSize);
      setPosition(originalPosition);
      setIsFullScreen(false);
    } else {
      // Store the original size and position before changing
      setOriginalSize(size);
      setOriginalPosition(position);

      // Set to full screen size
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
      setIsFullScreen(true);
    }
  };

  if (!isVisible) return null;

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: parseInt(ref.style.width, 10), // Convert to number
          height: parseInt(ref.style.height, 10), // Convert to number
        });
        setPosition(position);
      }}
      minWidth={400}
      minHeight={200}
      className="bg-white shadow-lg rounded-md overflow-hidden"
    >
      <div className="bg-gray-800 p-2 flex justify-between items-center text-white">
        <span>Todo</span>
        <div className="space-x-1">
          <button
            onClick={handleFitSize}
            className=" p-2 rounded"
          >
            {isFullScreen ? (
              <Icon
                icon={`fluent:resize-16-filled`}
                color="orange"
                fontSize={20}
                onClick={handleFitSize}
              />
            ) : (
                <Icon
                icon={`fluent:resize-16-filled`}
                color="orange"
                fontSize={20}
                onClick={handleFitSize}
              />
            )}
          </button>
          <button onClick={onClose} className=" p-1 rounded">
            <Icon icon={`carbon:close-filled`} color="red" fontSize={20} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p>This is your Todo content. You can add more components here.</p>
      </div>
    </Rnd>
  );
};

export default CalculatorWindow;
