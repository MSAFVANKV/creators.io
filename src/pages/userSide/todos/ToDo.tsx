// import { Icon } from "@iconify/react/dist/iconify.js";
// import React, { useEffect, useState } from "react";
// import { Rnd } from "react-rnd";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import CreateTodo from "./CreateTodo";
// import ViewTodos from "./ViewTodos";
// import axios from "axios";

// type TodoWindowProps = {
//   isVisible: boolean;
//   onClose: () => void;
// };

// // types.ts
// export type Todo = {
//   _id: string;
//   fields: Record<string, any>;
// };

// const TodoWindow: React.FC<TodoWindowProps> = ({ isVisible, onClose }) => {
//   const [size, setSize] = useState({ width: 400, height: 300 });
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [originalSize, setOriginalSize] = useState({ width: 400, height: 300 });
//   const [originalPosition, setOriginalPosition] = useState({ x: 100, y: 100 });
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");

//   const handleFitSize = () => {
//     if (isFullScreen) {
//       setSize(originalSize);
//       setPosition(originalPosition);
//       setIsFullScreen(false);
//     } else {
//       setOriginalSize(size);
//       setOriginalPosition(position);
//       setSize({ width: window.innerWidth, height: window.innerHeight });
//       setPosition({ x: 0, y: 0 });
//       setIsFullScreen(true);
//     }
//   };

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get(`/todos/get-todos`,{withCredentials:true});
//       setTodos(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   // const addTodo = async (todo: Todo) => {
//   //   setTodos([...todos, todo]);
//   // };

//   if (!isVisible) return null;

//   return (
//     <Rnd
//       size={size}
//       position={position}
//       onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
//       onResizeStop={(e, direction, ref, delta, position) => {
//         setSize({
//           width: parseInt(ref.style.width, 10),
//           height: parseInt(ref.style.height, 10),
//         });
//         setPosition(position);
//       }}
//       minWidth={300}
//       minHeight={300}
//       className="bg-white shadow-lg rounded-md"
//     >
//       <div className="bg-gray-800 p-2 flex justify-between items-center text-white rounded-t-md">
//         <div className="flex flex-col gap-1">
//           <span>Todo Application</span>
//           {message && <span className="text-green-600 text-xs">{message}</span>}
//         </div>

//         <div className="space-x-1">
//           <button onClick={handleFitSize} className="p-2 rounded">
//             <Icon icon="fluent:resize-16-filled" color="orange" fontSize={20} />
//           </button>
//           <button onClick={onClose} className="p-1 rounded">
//             <Icon icon="carbon:close-filled" color="red" fontSize={20} />
//           </button>
//         </div>
//       </div>
//       <div
//         className="p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
//         style={{ height: "calc(100% - 60px)" }}
//       >
//         <Tabs defaultValue="create">
//           <TabsList>
//             <TabsTrigger value="create">Create Todo</TabsTrigger>
//             <TabsTrigger value="view">View Todos</TabsTrigger>
//           </TabsList>

//           <TabsContent value="create">
//             <CreateTodo  setMessage={setMessage} setTodos={setTodos} />
//           </TabsContent>

//           <TabsContent value="view">
//             <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
//               <ViewTodos todos={todos} setTodos={setTodos} />
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </Rnd>
//   );
// };

// export default TodoWindow;
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateTodo from "./CreateTodo";
import ViewTodos from "./ViewTodos";
import axios from "axios";

type TodoWindowProps = {
  isVisible: boolean;
  onClose: () => void;
};

// types.ts
export type Todo = {
  _id: string;
  fields: Record<string, any>;
};

const TodoWindow: React.FC<TodoWindowProps> = ({ isVisible, onClose }) => {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [originalSize, setOriginalSize] = useState({ width: 400, height: 300 });
  const [originalPosition, setOriginalPosition] = useState({ x: 100, y: 100 });
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

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

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`/todos/get-todos`, {
        withCredentials: true,
      });
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // const addTodo = async (todo: Todo) => {
  //   setTodos([...todos, todo]);
  // };

  if (!isVisible) return null;

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, position) => {
        setSize({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        });
        setPosition({ x: position.x, y: position.y });
      }}
      minWidth={300}
      minHeight={300}
      className="bg-white shadow-lg rounded-md"
    >
      <div className="bg-gray-800 p-2 flex justify-between items-center text-white rounded-t-md">
        <div className="flex flex-col gap-1">
          <span>Todo Application</span>
          {message && <span className="text-green-600 text-xs">{message}</span>}
        </div>

        <div className="space-x-1">
          <button onClick={handleFitSize} className="p-2 rounded">
            <Icon icon="fluent:resize-16-filled" color="orange" fontSize={20} />
          </button>
          <button onClick={onClose} className="p-1 rounded">
            <Icon icon="carbon:close-filled" color="red" fontSize={20} />
          </button>
        </div>
      </div>
      <div
        className="p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        style={{ height: "calc(100% - 60px)" }}
      >
        <Tabs defaultValue="create">
          <TabsList>
            <TabsTrigger value="create">Create Todo</TabsTrigger>
            <TabsTrigger value="view">View Todos</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <CreateTodo setMessage={setMessage} setTodos={setTodos} />
          </TabsContent>

          <TabsContent value="view">
            <div className="overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <ViewTodos todos={todos} setTodos={setTodos} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Rnd>
  );
};

export default TodoWindow;
