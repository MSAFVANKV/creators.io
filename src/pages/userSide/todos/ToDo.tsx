import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Rnd } from "react-rnd";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CreateTodo from "./CreateTodo";
import ViewTodos from "./ViewTodos";

type TodoWindowProps = {
  isVisible: boolean;
  onClose: () => void;
};

type Todo = Record<string, any>;

const TodoWindow: React.FC<TodoWindowProps> = ({ isVisible, onClose }) => {
  const [size, setSize] = useState({ width: 400, height: 300 }); // Default size
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Default position
  const [isFullScreen, setIsFullScreen] = useState(false); // Track if full screen
  const [originalSize, setOriginalSize] = useState({ width: 400, height: 300 });
  const [originalPosition, setOriginalPosition] = useState({ x: 100, y: 100 });
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleFitSize = () => {
    if (isFullScreen) {
      setSize(originalSize);
      setPosition(originalPosition);
      setIsFullScreen(false);
    } else {
      setOriginalSize(size);
      setOriginalPosition(position);
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
      setIsFullScreen(true);
    }
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (index: number, updatedTodo: Todo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  if (!isVisible) return null;

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10) });
        setPosition(position);
      }}
      minWidth={300}
      minHeight={200}
      className="bg-white shadow-lg rounded-md overflow-hidden "
    >
      <div className="bg-gray-800 p-2 flex justify-between items-center text-white ">
        <span>Todo Application</span>
        <div className="space-x-1">
          <button onClick={handleFitSize} className="p-2 rounded">
            <Icon icon="fluent:resize-16-filled" color="orange" fontSize={20} />
          </button>
          <button onClick={onClose} className="p-1 rounded">
            <Icon icon="carbon:close-filled" color="red" fontSize={20} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <Tabs defaultValue="create">
          <TabsList>
            <TabsTrigger value="create">Create Todo</TabsTrigger>
            <TabsTrigger value="view">View Todos</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <CreateTodo onAddTodo={addTodo} />
          </TabsContent>

          <TabsContent value="view">
            <ViewTodos todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} />
          </TabsContent>
        </Tabs>
      </div>
    </Rnd>
  );
};

export default TodoWindow;
