import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ViewTodosProps = {
  todos: Record<string, any>[];
  onUpdateTodo: (index: number, updatedTodo: Record<string, any>) => void;
  onDeleteTodo: (index: number) => void;
};

const ViewTodos: React.FC<ViewTodosProps> = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const startEditing = (index: number, todo: Record<string, any>) => {
    setIsEditing(index);
    setEditValues(todo);
  };

  const saveEdit = (index: number) => {
    onUpdateTodo(index, editValues);
    setIsEditing(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setEditValues({ ...editValues, [name]: e.target.value });
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
        {todos.map((todo, index) => (
          <tr key={index}>
            <td className="border px-2 py-1">
              {isEditing === index ? (
                <>
                  {Object.entries(todo).map(([key, value], idx) => (
                    <div key={idx} className="mb-2">
                      <Input value={editValues[key]} onChange={(e) => handleChange(e, key)} />
                    </div>
                  ))}
                </>
              ) : (
                <pre>{JSON.stringify(todo, null, 2)}</pre>
              )}
            </td>
            <td className="border px-2 py-1">
              {isEditing === index ? (
                <>
                  <Button onClick={() => saveEdit(index)}>Save</Button>
                  <Button variant="destructive" onClick={() => setIsEditing(null)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => startEditing(index, todo)}>Edit</Button>
                  <Button variant="destructive" onClick={() => onDeleteTodo(index)}>Delete</Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewTodos;
