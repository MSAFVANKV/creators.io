
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";

// type ViewTodosProps = {
//   todos: Record<string, any>[];
//   onUpdateTodo: (index: number, updatedTodo: Record<string, any>) => void;
//   onDeleteTodo: (index: number) => void;
// };

// const ViewTodos: React.FC<ViewTodosProps> = ({ todos, onUpdateTodo, onDeleteTodo }) => {
//   const [isEditing, setIsEditing] = useState<number | null>(null);
//   const [editValues, setEditValues] = useState<Record<string, any>>({});

//   const startEditing = (index: number, todo: Record<string, any>) => {
//     setIsEditing(index);
//     setEditValues(todo);
//   };

//   const saveEdit = (index: number) => {
//     onUpdateTodo(index, editValues);
//     setIsEditing(null);
//   };
  

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
//     setEditValues({ ...editValues, [name]: e.target.value });
//   };

//   const handleSelectChange = (value: string, name: string) => {
//     setEditValues({ ...editValues, [name]: value });
//   };

//   return (
//     <table className="w-full border-collapse border border-gray-300">
//       <thead>
//         <tr className="bg-gray-200">
//           <th className="border px-2 py-1">Fields</th>
//           <th className="border px-2 py-1">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {todos.length > 0 ? (
//           todos.map((todo, index) => (
//             <tr key={index}>
//               <td className="border px-2 py-1">
//                 {isEditing === index ? (
//                   <>
//                     {Object.entries(todo).map(([key, value], idx) => (
//                       <div key={idx} className="mb-2">
//                         {Array.isArray(value) ? (
//                           <Select onValueChange={(value) => handleSelectChange(value, key)}>
//                             <SelectTrigger id={key} className="mt-1">
//                               {editValues[key] || "Select an option"}
//                             </SelectTrigger>
//                             <SelectContent>
//                               {value.map((option, optIdx) => (
//                                 <SelectItem key={optIdx} value={option}>
//                                   {option}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         ) : (
//                           <Input value={editValues[key] || ""} onChange={(e) => handleChange(e, key)} />
//                         )}
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <pre>{JSON.stringify(todo, null, 2)}</pre>
//                 )}
//               </td>
//               <td className="border px-2 py-1">
//                 {isEditing === index ? (
//                   <>
//                     <Button onClick={() => saveEdit(index)}>Save</Button>
//                     <Button variant="destructive" onClick={() => setIsEditing(null)}>
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button onClick={() => startEditing(index, todo)}>Edit</Button>
//                     <Button variant="destructive" onClick={() => onDeleteTodo(index)}>Delete</Button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={2} className="text-center py-2">
//               No todos available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default ViewTodos;

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

type Todo = {
  _id: string;
  fields: Record<string, any>;
};

type ViewTodosProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void; // Add setTodos prop
};

const ViewTodos: React.FC<ViewTodosProps> = ({ todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const startEditing = (id: string, todo: Record<string, any>) => {
    setIsEditing(id);
    setEditValues(todo.fields);
  };

  const saveEdit = async (id: string) => {
    try {
      const response = await axios.put(`/todos/update-todo/${id}`, editValues,{withCredentials:true});
      const updatedTodo = response.data; // Get the updated todo from the response
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
      setIsEditing(null);
      fetchTodos()
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const fetchTodos = async () => {
    try {
    const response =  await axios.get(`/todos/get-todos`,{withCredentials:true});
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/todos/delete-todo/${id}`,{withCredentials:true});
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    setEditValues({ ...editValues, [name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setEditValues({ ...editValues, [name]: value });
  };

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Fields</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <tr key={todo._id}>
              <td className="border px-2 py-1">
                {isEditing === todo._id ? (
                  <>
                    {Object.entries(editValues).map(([key, value], idx) => (
                      <div key={idx} className="mb-2">
                        {Array.isArray(value) ? (
                          <Select onValueChange={(value) => handleSelectChange(value, key)}>
                            <SelectTrigger id={key} className="mt-1">
                              {editValues[key] || "Select an option"}
                            </SelectTrigger>
                            <SelectContent>
                              {value.map((option, optIdx) => (
                                <SelectItem key={optIdx} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input value={editValues[key] || ""} onChange={(e) => handleChange(e, key)} />
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <pre>{JSON.stringify(todo.fields, null, 2)}</pre>
                )}
              </td>
              <td className="border px-2 py-1">
                {isEditing === todo._id ? (
                  <>
                    <Button onClick={() => saveEdit(todo._id)}>Save</Button>
                    <Button variant="destructive" onClick={() => setIsEditing(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => startEditing(todo._id, todo)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(todo._id)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2} className="text-center">
              No todos found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ViewTodos;

